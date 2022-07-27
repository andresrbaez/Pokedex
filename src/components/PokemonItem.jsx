import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getBackground from '../utils/getBackground';

const PokemonItem = ({ pokemonUrl }) => {

    const [ pokemon, setPokemon ] = useState({})

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(pokemonUrl)
            .then(res => setPokemon(res.data))
    }, []);
    // console.log(pokemon);


    return (
        <div 
            className={`item-box`}
            style={{background: getBackground(pokemon.types?.[0].type.name)}}
            onClick={() => navigate(`/pokedex/${pokemon.id}`)}
        >
            
                <div className='text'>
                    <h3 className='title-item'>{pokemon.name}</h3>
                    <p className='cloud'>
                        <b>
                            Types: 
                        </b>
                        {" "}{pokemon.types?.map(pokeType => (
                            <span key={pokeType?.type?.name}>{pokeType?.type?.name}{", "}</span>
                        ))}
                    </p>
                    <div>
                        <div className='cloud'>
                            <b>
                                hp: 
                            </b>
                            {" "}{pokemon.stats?.[0].base_stat}
                        </div>
                    </div>
                    <div>
                        <div className='cloud'>
                            <b>
                                attack: 
                            </b>
                            {" "}{pokemon.stats?.[1].base_stat}
                        </div>
                    </div>
                    <div>
                        <div className='cloud'>
                            <b>
                                defense: 
                            </b>
                            {" "}{pokemon.stats?.[2].base_stat}
                        </div>
                    </div>
                    <div>
                        <div className='cloud'>
                            <b>
                                speed: 
                            </b>
                            {" "}{pokemon.stats?.[5].base_stat}
                        </div>
                    </div>

                </div>
                <div className='img'>
                    <img className='img-pokemon-item' src={pokemon.sprites?.other?.["official-artwork"]?.front_default} alt="" />
                </div>
            
            
        </div>
    );
};

export default PokemonItem;