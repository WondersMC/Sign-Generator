import { useState } from 'react'
import './App.css'

import foods from './foods.json';

function App() {
  const [item, setItem] = useState("");
  const [name, setName] = useState("");
  const [metaData, setMetaData] = useState(0);
  const [commandString, setCommandString] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const handleInputChange = (e: { target: { value: string; }; }) => {
    const inputValue = e.target.value;
    setItem(inputValue);
    
    const matchingFoods = foods.filter((food: any) => {
      return food.name.toLowerCase().startsWith(inputValue.toLowerCase())
    });
    
    console.log(matchingFoods)
    
    setSuggestions(matchingFoods);
  };

  const handleSuggestionClick = (suggestion: any) => {
    setItem(suggestion.name);
    setMetaData(0)
    setSuggestions([]);
  };

  const handleVariationClick = (suggestion: any, metaData: number) => {
    setItem(suggestion.name);
    setMetaData(metaData)
    setSuggestions([]);
  };

  return (
    <>
    <h1>Sign Generator</h1>
    <p>Enter the food you want to make a sign for and pick one of the food options.</p>
      <div className='col'>
        <label htmlFor="name">Give a name</label>
        <input type="text" id='name' value={name} onChange={(e) => setName(e.target.value)}/>
      </div>
      <hr />
      <div className='col'>
        <label htmlFor="item">Give an Item</label>
        <input type="text" id='item' value={item} onChange={(e) => handleInputChange(e)} />
        {suggestions.length > 0 && (
          <ul className='item-list'>
          {suggestions.map((suggestion: any) => (
            suggestion.variations ? 
              suggestion.variations.map((vars: any) => (
                <li key={vars.metadata} onClick={() => handleVariationClick(suggestion, vars.metadata)}>
                  {vars.displayName}
                </li>
              )) :
              <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion.displayName}
              </li>
          ))}
        </ul>
        
        )}
      </div>
      <hr />
      <div className='col'>
        <label htmlFor="metadata">Give a metadata</label>
        <input type="number" id='metadata' value={metaData} onChange={(e) => setMetaData(e.target.valueAsNumber)}/>
      </div>
      <button onClick={() => {
        if (!item || metaData === undefined || !name) {
          alert('Please fill in all the options')
        } else {
          setCommandString(`give @p sign 1 0 {BlockEntityTag:{Text1:"{\\"text\\":\\"Click to Order\\",\\"clickEvent\\":{\\"action\\":\\"run_command\\",\\"value\\":\\"give @p minecraft:${item} 1 ${metaData} {display:{Name:\\\\\\"${name}\\\\\\",Lore:[\\\\\\"Wonder's Finest Cuisine\\\\\\"]}}\\"}}",Text2:"{\\"text\\":\\"${name}\\",\\"color\\":\\"dark_blue\\",\\"bold\\":true}\\""},display:{Name:"${name} Sign"}}`)
        }

      }}>Generate command</button>
      <h2>Command:</h2>
      <p>Place in command blocks and get your sign to start placing.</p>
      <textarea value={commandString} placeholder='Your command will show up here'></textarea>
    </>
  );
}

export default App;
