import React, { useState, useEffect } from 'react';
import { getAllPokemon, getPokemon } from './services/pokemon';
import Card from './componets/Card';
import Navbar from './componets/Navbar';
import './App.css';
import Searchbar from './componets/Searchbar';


function App() {
  const [PokemonData, setPokemonData] = useState ([]);
  const [nextUrl, setNextUrl] = useState ('');
  const [prevUrl, setPrevUrl] = useState ('');
  const [loading, setLoading] = useState (true);
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10'

  useEffect(() => {
    async function fetchData(){ 
      let response = await getAllPokemon(initialUrl);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      let pokemon = await loadingPokemon(response.results);
      console.log(pokemon);
      setLoading(false);
    }
    fetchData();
  }, []);

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl)
    await loadingPokemon(data.results)
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const prev = async () => {
    if(!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl)
    await loadingPokemon(data.results)
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async pokemon => {
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord
    }))

    setPokemonData(_pokemonData)
  }

  return (
    <div>
      {loading ? <h1>Cargando...</h1> : (
        <>
        <Navbar/>
        <Searchbar/>
        <div className='btn'>
          <button onClick={prev}>Anterior</button>
          <button onClick={next}>Siguiente</button>
        </div>
          <div className='grid-container'>
            {PokemonData.map ((pokemon, i) => {
              return <Card key={i} pokemon={pokemon}/>
            })}
          </div>
          <div className='btn'>
          <button onClick={prev}>Anterior</button>
          <button onClick={next}>Siguiente</button>
        </div>
        </>
      )
    }
    </div>
  );
}

export default App;