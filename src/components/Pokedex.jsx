import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PokemonItem from "./PokemonItem";

const Pokedex = () => {
  const user = useSelector((state) => state.user);

  const [getPokemons, setGetPokemons] = useState([]);
  const [pokemonSearch, setPokemonSearch] = useState("");
  const [types, setTypes] = useState([]);

//   const colors = [
//     "#5539A5",
//     "#322F20",
//     "#6A5837",
//     "#988F2A",
//     "#ffc75f",
//     "#C28E70",
//     "#90905C",
//     "#4b4453",
//     "#b0a8b9",
//     "#c34a36",
//   ];

  const navigate = useNavigate();

  // https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154
  useEffect(() => {
    const random = Math.floor(Math.random() * 20) + 1;
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/`)
      .then((res) => setGetPokemons(res.data.results));

    axios
      .get(`https://pokeapi.co/api/v2/type/`)
      .then((res) => setTypes(res.data.results));
  }, []);
  // console.log(getPokemons);

  const search = (e) => {
    e.preventDefault();
    navigate(`/pokedex/${pokemonSearch}`);
  };

  const filterPokemon = (e) => {
    // alert('Se seleccionó '+ e.target.value)
    axios.get(e.target.value).then((res) => setGetPokemons(res.data.pokemon));
  };
  // console.log(getPokemons);

  // PAGINATION

  const [page, setPage] = useState(1);
  const lastIndex = page * 20;
  const firstIndex = lastIndex - 20;
  const pokemonsPaginated = getPokemons.pokemon?.slice(firstIndex, lastIndex);

  //   const lastPage = Math.ceil(getPokemons.pokemon?.length / charactersPerPage);
  const lastPage = Math.ceil(getPokemons.pokemon?.length / 20);

  const numbers = [];
  for (let i = 1; i <= lastPage; i++) {
    numbers.push(i);
  }

//   const toggleSearch = () => {
//     if()
//   }

  return (
    <div>
      <div className="pokeball-background"></div>  
      <div className="log-out">
        <a href="#/">
          <div className="out-div">
            <i className="bx bx-log-out-circle"></i>
          </div>
        </a>
      </div>
      <div>
        <h1 className="poke-title">Pokedex</h1>
        <p className="title-p">Welcome <b>{user}</b> this is the pokedex wiki</p>
        <div className="center">
          <span>type</span>
          <input type="checkbox" />
          <span>pokemon</span>
        </div>

        <div className="center">
          <input id="check" type="checkbox" />
          <div className="box">
            <form onSubmit={search} className="form-inp">
              <input
                type="text"
                value={pokemonSearch}
                placeholder="Search here..."
                onChange={(e) => setPokemonSearch(e.target.value)}
              />
              <label htmlFor="check">
                <i className="bx bx-search-alt-2"></i>
              </label>
              {/* <button>Search</button> */}
            </form>
          </div>
        </div>

        {/* Sección para filtrar */}
        <select onChange={filterPokemon}>
          <option value="">All pokemons</option>
          {types.map((type) => (
            <option value={type.url} key={type.url}>
              {type.name}
            </option>
          ))}
        </select>

        <hr />
        <br />
        <br />
        <div className="card-ul">
          <ul className="ul-grid">
            {getPokemons.map((getPokemon) => (
              <li
                key={getPokemon.url ? getPokemon.url : getPokemon.pokemon.url}
              >
                <PokemonItem
                  pokemonUrl={
                    getPokemon.url ? getPokemon.url : getPokemon.pokemon.url
                  }
                  // pokemonUrl={getPokemon.url}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="btn-pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Prev page
        </button>
        {numbers.map((number) => (
            <button onClick={() => setPage(number)}>{number}</button>
        ))}
        <button onClick={() => setPage(page + 1)} disabled={page === lastPage}>
            Next Page
        </button>
      </div>


    </div>
  );
};

export default Pokedex;
