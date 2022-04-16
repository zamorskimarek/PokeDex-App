//NOTE !!! In this task I was asked to get familiar with documentation of the API I would be using.
//As this is a free API the creators were asking to locally cache resources whenever we request them.
// In order to minimize the amount of request to their API I have decided to store the data I have already
// fetched to localStorage. With every Pokemon we want to display app is checking for if this Pokemon already
// exists in your localStorage. If so, the Pokemon data will be taken from localStorage instead of sending
// another request. By using this app you agree to save data in your localStorage.
// If you are done with using this app please consider clicking on "clear localStorage" button.

import React, {useState} from "react";


export const Pokemon = ({...pokemon}) => {
    const [pokemonLoading, setPokemonLoading] = useState(true)

    return (
        <li className="pokemon-card">
            <div className="pokemon-card__content">
                <div className="pokemon-card__front">
                    <p className="pokemon-card__front__content capitalize bold">{pokemon.name}</p>
                    <div className="pokemon-card__front__content poke-id">Poke ID: {pokemon.id}</div>
                    <div className="types-display pokemon-card__front__content">
                        {pokemon.types.length === 1 ? (<span>Type:{"\u00a0"}</span>) : (<span>Types:{"\u00a0"}</span>)}
                        {pokemon.types.map((el, index) => <span key={index}>{el.type.name}{"\u00a0"}</span>)}
                    </div>
                    {pokemonLoading && (<div className="pokemon-loader-position">
                        <div className="pokemon-loader"></div>
                    </div>)}
                    <img className="sprite" src={pokemon.spriteFront} onLoad={() => setPokemonLoading(false)} style={{display: "inline-block"}}></img>
                </div>
                <div className="pokemon-card__back">
                    <div className="pokemon-info">
                        <p className="pokemon-card__back__content bold">Additional Info:</p>
                        <p className="pokemon-card__back__content">Weight: {pokemon.weight}</p>
                        <p className="pokemon-card__back__content">Height: {pokemon.height}</p>
                    </div>
                    <img className="sprite" src={pokemon.spriteBack} style={{display: "inline-block"}}></img>

                </div>
            </div>
        </li>
    )
}