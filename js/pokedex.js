import React, {useEffect, useState} from "react";
import {Pokemon} from "./pokemon";


const Pokedex = () => {
    const [pokemonList, setPokemnList] = useState([]);
    const [next, setNext] = useState(20)
    const [localLoaded, setLocaleLoaded] = useState(false)
    const [count, setCount] = useState(null)

    const useURLs = () => {
        fetch(" https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
            .then(response => response.json())
            .then(data => {
                setCount(data.count)
                let rawData = data.results
                let arrayOfIds = []
                rawData.map(el => arrayOfIds.push(el.url.replace("https://pokeapi.co/api/v2/pokemon/","")))
                localStorage.setItem("arrayOfIds", JSON.stringify(arrayOfIds))
                setLocaleLoaded(true)
            })
            .catch(err => alert(err))
    }



    useEffect(() => {
        if (JSON.parse(localStorage.getItem("arrayOfIds")) === null) {
            useURLs()
            return
        }

        for (let i = next - 20; i < next; i++) {
            if (localStorage.getItem(JSON.parse(localStorage.getItem("arrayOfIds"))[i]) === null) {
                fetch(`https://pokeapi.co/api/v2/pokemon/${JSON.parse(localStorage.getItem("arrayOfIds"))[i]}`)
                    .then(response => response.json())
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
                        localStorage.setItem(JSON.parse(localStorage.getItem("arrayOfIds"))[i], JSON.stringify(pok))
                        setPokemnList(prevState => [...prevState, pok])
                    })
                    .catch(error => console.log("ERROR", error))
            } else {
                setPokemnList(prevState => [...prevState, JSON.parse(localStorage.getItem(JSON.parse(localStorage.getItem("arrayOfIds"))[i]))])
            }
        }
    }, [next, localLoaded])



    const handleMore = () => {
        setNext(prevState => prevState + 20)
    }

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
                        loaded: true,
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
                            loaded: true,
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
        alert("Your Local Storage has been cleared")
        setPokemnList([])
        setLocaleLoaded(false)
        setNext(20)
    }

    pokemonList.sort(function(a, b) {
        return a.id - b.id
    })



    return !pokemonList.length ? (
        <div className="loader-position">
            <div className="loader"></div>
        </div>
    ) : (
        <div className="container">
            <h1 className="center-text">PokeDex App</h1>
            <div className="menu">
                <button onClick={handleDarkMode} className="btn">Toggle dark mode</button>
                <form onSubmit={handleSearch}>
                    <input type="text" placeholder="search by ID or name" className="input-text" value={search} onChange={e => setSearch(e.target.value)}/>
                    <button type="submit" className="btn">Search</button>
                </form>
            </div>
            <div className="search-results">
                {searchedPokemon !== null && <p className="bold">Here is a Pokemon you were searching for !!!</p>}
                {searchedPokemon !== null && <Pokemon{...searchedPokemon}></Pokemon>}
                {searchedPokemon !== null && <button className="btn" onClick={handleCloseSearched}>CLOSE</button>}
            </div>
            <ul className="poke-list">
                {
                    pokemonList.map(pokemon => (
                            <Pokemon key={pokemon.id} {...pokemon}></Pokemon>
                        )
                    )
                }
            </ul>
            <div className="center-hor">
                {(pokemonList.length !== count) && <button className="btn-big btn" onClick={handleMore}>show me more</button>}
                <button className="btn-big btn" onClick={handleClear}>clear localStorage</button>
            </div>
        </div>
    )
}

export default Pokedex

