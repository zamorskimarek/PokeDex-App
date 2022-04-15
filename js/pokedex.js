import React, {useEffect, useState} from "react";
import {Pokemon} from "./pokemon";

const Pokedex = () => {
    const [pokemonList, setPokemnList] = useState([]);
    const [next, setNext] = useState(20)

    const [pokemonID, setPokemonID] useState([])
    const checkPokemons = () => {
        fetch()
    }


    useEffect(() => {
        for (let i = next - 19; i <= next; i++) {
            if (localStorage.getItem(i) === null) {
                fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
                    .then(response => response.json())
                    .then(data => {
                        // console.log(data);
                        // setPokemnList(prevState => [...prevState, data])
                        let pok = {
                            name: data.name,
                            id: data.id,
                            weight: data.weight,
                            height: data.height,
                            types: data.types,
                            spriteFront: data.sprites.front_default,
                            spriteBack: data.sprites.back_default,
                        }
                        localStorage.setItem(data.id, JSON.stringify(pok))
                        setPokemnList(prevState => [...prevState, pok])
                    })
                    .catch(error => console.log("ERROR", error))
            } else {
                setPokemnList(prevState => [...prevState, JSON.parse(localStorage.getItem(i))])
            }
        }
    }, [next])

    const handleMore = () => {
        setNext(prevState => prevState + 20)
    }

    // console.log(pokemonList)

    const handleDarkMode = () => {
        let element = document.body;
        element.classList.toggle("dark-mode");
    }


    const [searchedPokemon, setSearchedPokemon] = useState(null)
    const [search, setSearch] = useState("")

    const handleSearch = (e) => {
        e.preventDefault()
        if (isNaN(search)) {
            let id = search.toLowerCase()
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then(r => r.json())
                .then(data => {
                    let pok = {
                        name: data.name,
                        id: data.id,
                        weight: data.weight,
                        height: data.height,
                        types: data.types,
                        spriteFront: data.sprites.front_default,
                        spriteBack: data.sprites.back_default,
                    }
                    setSearchedPokemon(pok)
                })
                .catch(err => {
                    console.warn(err)
                    alert("There is no Pokemon with this name in database. Please check your spelling and try again.")
                })
        } else {
            localStorage.getItem(search) ?
                (setSearchedPokemon(JSON.parse(localStorage.getItem(search)))) :
                (fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
                    .then(r => r.json())
                    .then(data => {
                        let pok = {
                            name: data.name,
                            id: data.id,
                            weight: data.weight,
                            height: data.height,
                            types: data.types,
                            spriteFront: data.sprites.front_default,
                            spriteBack: data.sprites.back_default,
                        }
                        setSearchedPokemon(pok)
                    })
                    .catch(err => {
                        console.warn(err)
                        alert("There is no Pokemon with this ID in database. Please try again.")
                    }))
        }
        setSearch("")
    }

     const handleCloseSearched = () => {
        setSearchedPokemon(null)
    }

    const handleClear = () => {
        localStorage.clear()
    }

    pokemonList.sort(function(a, b) {
        return a.id - b.id  ||  a.name.localeCompare(b.name);
    });



    return !pokemonList.length ? (
        <div className="loader-position">
            <div className="loader"></div>
        </div>
    ) : (
        <div className="container">
            <h1 className="center-text">PokeDex App</h1>
            <div className="menu">
                <button onClick={handleDarkMode} className="btn">Toggle dark mode</button>
                {/*<button className="button" onClick={handleMore}>show me more</button>*/}
                <form onSubmit={handleSearch}>
                    <input type="text" placeholder="search by ID or name" className="input-text" value={search} onChange={e => setSearch(e.target.value)}/>
                    <button type="submit" className="btn">Search</button>
                </form>
            </div>
            <div className="search-results">
                {searchedPokemon !== null && <p>Here is a Pokemon you were searching for !!!</p>}
                {searchedPokemon !== null && <Pokemon{...searchedPokemon}></Pokemon>}
                {searchedPokemon !== null && <button className="btn" onClick={handleCloseSearched}>CLOSE</button>}
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
                <button className="button btn" onClick={handleMore}>show me more</button>
                <button className="button btn" onClick={handleClear}>clear localStorage</button>
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
