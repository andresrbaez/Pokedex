import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import PokemonItem from "./PokemonItem";

const Pokedex = () => {
  const user = useSelector((state) => state.user);

  const [getPokemons, setGetPokemons] = useState([]);
  const [pokemonSearch, setPokemonSearch] = useState("");
  const [types, setTypes] = useState([]);

  const [ toggle, setToggle ] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style= 'background: #fff'
  }, [ location ])

  // https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154
  useEffect(() => {
    const random = Math.floor(Math.random() * 20) + 1;
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154`)
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
  const pokemons = getPokemons.pokemon ? getPokemons.pokemon : getPokemons
  const pokemonsPaginated = pokemons.slice(firstIndex, lastIndex);

  //   const lastPage = Math.ceil(getPokemons.pokemon?.length / charactersPerPage);
  const lastPage = Math.ceil(pokemons.length / 20);

  const numbers = []; // [1, 2, 3, 4, 5, 6 ... 57]
  for (let i = 1; i <= lastPage; i++) {
    if(numbers.length < 10){
        numbers.push(i);
    }
  }

//   console.log(searchFilter)

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
          <input type="checkbox" checked={toggle} onChange={e => setToggle(e.target.checked)} />
          <span>pokemon</span>
        </div>

        {
            toggle ? (
                <>
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
                </>
            ) : (
                <>

                {/* Sección para filtrar */}
                <select onChange={filterPokemon}>
                <option value="">All pokemons</option>
                {types.map((type) => (
                    <option value={type.url} key={type.url}>
                    {type.name}
                    </option>
                ))}
                </select>
                </>
            )
        }


        <hr />
        <br />
        <br />
        <div className="card-ul">
          <ul className="ul-grid">
            {pokemonsPaginated.map((getPokemon) => (
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
            <button key={number} onClick={() => setPage(number)}>{number}</button>
        ))}
        <button onClick={() => setPage(page + 1)} disabled={page === lastPage}>
            Next Page
        </button>
      </div>


    </div>
  );
};

export default Pokedex;
