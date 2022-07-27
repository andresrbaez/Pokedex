import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import getBackground from "../utils/getBackground";

const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState({});

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => setPokemon(res.data));
    // .catch(error => console.error)
  }, [id]);
  console.log(pokemon.types?.[0].type.name);

  document.body.style=`background: ${getBackground(pokemon.types?.[0].type.name)}`

  return (
    <div>
      <div className="pokeball-background"></div>
      <div className="header-back">
        <a href="#/pokedex">
          <i className="bx bx-left-arrow-alt txt-shadow"></i>
        </a>
      </div>
      <div className="img-logo-bg">
        <img src="./src/images/pngegg.png" alt="" />
      </div>
      <div className="principal-columns">
        <div>
          <div className="container-pokemon box-shadow">
            <img
              className="img-pokemon"
              src={pokemon.sprites?.other?.["official-artwork"]?.front_default}
              alt=""
            />
            <div className="principal-info">
              <h2 className="weight">
                {pokemon.weight}
                <div className="sub-weight">Weight</div>
              </h2>
              <h2 className="height">
                {pokemon.height}
                <div className="sub-height">Height</div>
              </h2>
            </div>
            <div className="div-title">
              <h1 className="h1-title">{pokemon.name}</h1>
              <div>
                <b className="border-id"># {pokemon.id}</b>
              </div>
            </div>
          </div>

          <div className="type-abilities">
            <div className="container-type box-shadow">
              <div className="h1-type">
                <h1 className="h1-txt">Type</h1>
              </div>
              <hr />
              <div className="container-type-info">
                <div>
                  {pokemon.types?.map((pokeType) => (
                    <li key={pokeType?.type?.url}>{pokeType?.type?.name}</li>
                  ))}
                </div>
              </div>
            </div>
            <div className="container-abilities box-shadow">
              <div className="h1-type">
                <h1 className="h1-txt">Abilities</h1>
              </div>
              <hr />
              <div className="container-type-info">
                <div>
                  {pokemon.abilities?.map((pokeAbs) => (
                    <li key={pokeAbs?.ability?.url}>
                      {pokeAbs?.ability?.name}
                    </li>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="stats-container box-shadow">
            <h1 className="h1-txt">Stats</h1>
            <ul>
              {pokemon.stats?.map((pokeStats) => (
                <li key={pokeStats?.stat?.url}>
                  <b>
                    {pokeStats?.stat?.name}
                    {": "}
                  </b>
                  {pokeStats?.base_stat}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container-movements box-shadow">
          <h1 className="h1-txt">Movements</h1>
          <ul>
            {pokemon.moves?.map((pokeMoves) => (
              <li key={pokeMoves?.move?.url}>
                <p>{pokeMoves?.move?.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
