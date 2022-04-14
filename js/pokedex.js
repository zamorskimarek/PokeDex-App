import React, {useEffect, useState} from "react";
import {getPokemons} from "./API/pokeapi";
import {Pokemon} from "./pokemon";

const Pokedex = () => {
    const [pokemonList, setPokemnList] = useState([]);
    const [next, setNext] = useState(5)


    useEffect(() => {
        for (let i = next - 4; i <= next; i++) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    // setPokemnList(prevState => [...prevState, data])
                    let pok = {
                        name: data.name,
                        id: data.id,
                        weight: data.weight,
                        types: data.types,
                        spriteFront: data.sprites.front_default,
                        spriteBack: data.sprites.back_default,
                    }
                    localStorage.setItem(data.id, JSON.stringify(pok))
                    setPokemnList(prevState => [...prevState, pok])
                })
                .catch(error => console.log("ERROR", error))
        }
    }, [next])

    const handleMore = () => {
        setNext(prevState => prevState + 5)
    }

    console.log(pokemonList)

    const handleDarkMode = () => {
        let element = document.body;
        element.classList.toggle("dark-mode");
    }

    return !pokemonList.length ? (
        <span>czekaj...</span>
    ) : (
        <div className="container">
            <h1 className="center-text">PokeDex App</h1>
            <div className="menu">
                <button onClick={handleDarkMode}>Toggle dark mode</button>
                {/*<button className="button" onClick={handleMore}>show me more</button>*/}
                <form>
                    <input type="text"></input>
                    <button>Search</button>
                </form>
            </div>
            {/*<button onClick={handleMore}>show me more</button>*/}
            <ul className="listaPoke">
                {
                    pokemonList.map(pokemon => (
                        <Pokemon key={pokemon.id} {...pokemon}></Pokemon>
                        )
                    )
                }
            </ul>
            <div className="center-hor">
                <button className="button" onClick={handleMore}>show me more</button>
            </div>
        </div>
    )
}

// const Pokemon = () => {
//     const [pokemonList, setPokemnList] = useState([]);
//     // https://pokeapi.co/api/v2/pokemon?offset=20&limit=20
//
//     useEffect(() => {
//         fetch('https://pokeapi.co/api/v2/pokemon/1')
//             .then(response => response.json())
//             .then(data => {
//                 console.log(data);
//                 setPokemnList(data)
//             })
//             .catch(error => console.log("ERROR", error))
//
//
//     }, [])
//
//     if (pokemonList.length) {
//         console.log(pokemonList.sprites)
//         console.log(pokemonList)
//         console.log(pokemonList.name)
//         console.log(pokemonList.types)
//     }
//
//
//     return !pokemonList.length ? (
//         <span>czekaj...</span>
//     ) : (
//         <div>
//             <h1>Pokemony</h1>
//             <p>{pokemonList.name}</p>
//             <p>{pokemonList.weight}</p>
//             {/*<p>{pokemonList.types[0].type.name}</p>*/}
//             {/*<p>{pokemonList.sprites.front_default}</p>*/}
//             {/*<a href={pokemonList.sprites.front_default}>link</a>*/}
//             {/*<img src={pokemonList.sprites.front_default}></img>*/}
//         </div>
//     )
// }

export default Pokedex
