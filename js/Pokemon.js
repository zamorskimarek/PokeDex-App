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