import React from "react";

export const Pokemon = ({...pokemon}) => {
    return (
        <li className="pokemon-card">
            <div className="pokemon-card__content">
                <div className="pokemon-card__front">
                    <p className="pokemon-card__front__content capitalize qqq">{pokemon.name}</p>
                    {/*<div>waga: {pokemon.weight}</div>*/}
                    <div className="pokemon-card__front__content zzz">Poke ID: {pokemon.id}</div>
                    <div className="types-display pokemon-card__front__content">
                        {pokemon.types.length === 1 ? (<span>Type:{"\u00a0"}</span>) : (<span>Types:{"\u00a0"}</span>)}
                        {pokemon.types.map((el, index) => <span key={index}>{el.type.name}{"\u00a0"}</span>)}
                    </div>
                    <img className="sprite" src={pokemon.spriteFront}></img>
                </div>
                <div className="pokemon-card__back">
                    <div className="xxx">
                        <p className="pokemon-card__back__content qqq">Additional Info:</p>
                        <p className="pokemon-card__back__content">waga: {pokemon.weight}</p>
                        <p className="pokemon-card__back__content">{pokemon.name}</p>
                    </div>
                    <img className="sprite" src={pokemon.spriteBack}></img>

                </div>
            </div>
        </li>


        // <div className="pokemon-card">
        //     <p className="capitalize">{pokemon.name}</p>
        //     {/*<div>waga: {pokemon.weight}</div>*/}
        //     <div>numer kat: {pokemon.id}</div>
        //     <div className="types-display">
        //         {pokemon.types.length === 1 ? (<span>Type:{"\u00a0"}</span>) : (<span>Types:{"\u00a0"}</span>)}
        //         {pokemon.types.map((el, index) => <span key={index}>{el.type.name}{"\u00a0"}</span>)}
        //     </div>
        //     <img className="sprite" src={pokemon.spriteFront}></img>
        //     {/*<img className="sprite" src={pokemon.spriteBack}></img>*/}
        // </div>


        // <div className="card">
        //     <div className="card__content">
        //         <div className="card__front">
        //             <h3 className="card__title">{pokemon.name}</h3>
        //             <p className="card__subtitle">numer kat: {pokemon.id}</p>
        //             <img src={pokemon.spriteFront}></img>
        //         </div>
        //         <div className="card__back">
        //             <p className="card__body">waga: {pokemon.weight}</p>
        //             <img className="sprite" src={pokemon.spriteBack}></img>
        //         </div>
        //     </div>
        // </div>
    )
}