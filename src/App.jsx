import React, { useState, useEffect } from 'react';
import  axios  from "axios";
import './App.css';

const URL_PATH = "https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json";




const App = () => {

const [pokemons, setPokemons] = useState([]);
const [filteredPokemons, setFilteredPokemons] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    const result = await axios(
     URL_PATH
    );
    setPokemons(result.data);
  };
  fetchData();
},[]);

const handleOnChangeName = (keyword) => {
    const regex = new RegExp(keyword, 'gi');
    const temp = keyword!=="" &&  pokemons.filter(p => p.Name.match(regex) || p.Types.filter(p => p.match(regex)).length>0)
    
    let temp2 = temp && temp.sort(function(a, b) {
        var nameA = a.Name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.Name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      });
    
    setFilteredPokemons(temp2 && temp2.slice(0,4))
}

return <>
    <label htmlFor="maxCP" className="max-cp">
        <input type="checkbox" id="maxCP"/>
        <small>
            Maximum Combat Points
        </small>
    </label>
    <input type="text" className="input" placeholder="Pokemon or type"  onChange={e => handleOnChangeName(e.target.value)} />
    <div className="loader"></div>
    <ul className="suggestions">
{ filteredPokemons && filteredPokemons.map(e => <li key={e.Number}>
    
<img src={e.img} alt="" />
<div className="info">
    <h1 className="no-results">
        {e.Name}
    </h1>
    <p>{e.MaxHP}</p>
    <p>{e.MaxCP}</p>

</div>


</li>)}    </ul>
</>};

export default App;

/**/
