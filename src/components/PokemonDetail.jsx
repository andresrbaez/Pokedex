import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import getBackground from "../utils/getBackground";

const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState({});

  const { id } = useParams();

//   data-percent={`${(100/(150/(pokeStats?.base_stat)))}`}
    //  const divStyle = { width: `${(100/(150/(pokeStats?.base_stat)))}%` };
//   const divStyles = { width: "40%", background: "green" };
//   const divStyles = { width: "40%", background: "green" };

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => setPokemon(res.data));
    // .catch(error => console.error)
  }, [id]);
  console.log(pokemon.types?.[0].type.name);

  document.body.style=`background: ${getBackground(pokemon.types?.[0].type.name)}`

  return (
    <div className="center-b">
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
                <div className="container-wrap">
                  {pokemon.types?.map((pokeType) => (
                    <div 
                    className="container-wrap-inf" 
                    style={{background: getBackground(pokeType?.type?.name), color: "#fff"}} 
                    key={pokeType?.type?.url}
                    >
                        <p>{pokeType?.type?.name}</p>
                    </div>
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
                <div className="container-wrap">
                  {pokemon.abilities?.map((pokeAbs) => (
                    <div className="container-wrap-inf bg-ab" key={pokeAbs?.ability?.url}>
                      <p>{pokeAbs?.ability?.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="stats-container box-shadow">
            <h1 className="h1-txt">Stats</h1>
            <div className="container-flex-stats">
              {pokemon.stats?.map((pokeStats) => (
                <div 
                className="row-stats"
                key={pokeStats?.stat?.url}>
                  <div className="row-left-stats">
                    <div className="stat-first">
                        {pokeStats?.stat?.name}
                        {": "}
                    </div>
                  </div>
                  <div className="row-right-stats">
                    <div className="stat-bar" >
                        <div className="stat-last" data-percent={`${(100/(150/(pokeStats?.base_stat)))}`} style={{ width: `${(100/(150/(pokeStats?.base_stat)))}%` , background: "#e3924cc6"}}>
                        {/* <div className="stat-last" style={{ width: "40%", background: "green" }}> */}
                            {pokeStats?.base_stat}/150
                        </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="container-movements box-shadow">
          <h1 className="h1-txt">Movements</h1>
          <table>
            {pokemon.moves?.map((pokeMoves) => (
              <tbody key={pokeMoves?.move?.url}>
                <tr>
                    <td className="line-movement">{pokeMoves?.move?.name}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
