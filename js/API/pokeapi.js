import React,{useState,useEffect} from "react";
//import Pokemon from "./pokemon";

// const useFetch = (url) => {
//     let cache = null;
//     try {
//         cache = JSON.parse(localStorage.getItem("fetch_cache"))
//     } catch (e) {
//         console.warn(e)
//     }
//     const [data, setData] = useState(null)
//
//     if (cache?.[url]) {
//         setData(cache[url])
//     } else {
//         fetch(url)
//             .then(r => r.json())
//             .then(data => {
//                 setData(data)
//                 localStorage.setItem("fetch_cache", JSON.stringify({
//                     ...cache,
//                     [url]: data
//                 }))
//             })
//     }
//
//     return {data}
// }
//
// const App = () =>{
//     const pokemonsIDs =[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
//     const [pokemonList, setPokemnList] = useState([]);
//     const pokeApi = "http://pokeApi.co/api/v2/pokemon/";
//
//     const data = useFetch("http://pokeApi.co/api/v2/pokemon/1")
//
//     // const fetchData = () => {
//     //     Promise.all(pokemonsIDs.map(id => useFetch(pokeApi + id)))
//     //         .then(results =>  Promise.all(results.map(r => r.json())) )
//     //         .then(pokemons => setPokemnList(pokemons))
//     // }
//     let poke = [];
//     useEffect(() => {
//         // fetchData()
//
//     }, [])
//
//     console.log(pokemonList)
//     return !pokemonList?.length ? (
//         <span>czekaj...</span>
//     ) : (
//         <div>
//             <h1>Pokemony</h1>
//             <ul className="list">
//                 {
//                     pokemonList.map(pokemon => (
//                             <span style={{ display: "block" }}>{pokemon.name}</span>
//                         )
//                     )
//                 }
//             </ul>
//         </div>
//     )
// }
//
// export default App;

let [pokemonCount, setPokemonCount] = useState(null) //how many pokemons in world
let [next, setNext] = useState("http://pokeApi.co/api/v2/pokemon/?limit=20&offset=0") // url to next 20 pokemons (or less if last page)
let [pokemonsURLs, setPokemonsURLs] = useState([]) //array of pokemons URLs
let [loading, setLoading] = useState(true) //loading state for app
let [pokemonsLoading, setPokemonsLoading] = useState(true) //loading state for single pokemon card
const [pokemonList, setPokemonList] = useState([]); // array with pokemons details


export const usePokemons = (next) => {
    fetch(next)
        .then(r => r.json())
        .then(data => {
            setPokemonCount(data.count)
            setNext(data.next)
            data.results.map(el => setPokemonsURLs(prev => [...prev, el.url]))
            setLoading(false)
        })
        Promise.all(pokemonsURLs.map(url => {
            let cache = null;
            try {
                cache = JSON.parse(localStorage.getItem("fetch_cache"))
            } catch (e) {
                console.warn(e)
            }
            const [pokemonData, setPokemonData] = useState(null)

            if (cache?.[url]) {
                setPokemonData(cache[url])
            } else {
                fetch(url)
                    .then(r => r.json())
                    .then(data => {
                        let singlePokemon = {
                            name: data.name,
                            id: data.id,
                            weight: data.weight,
                            types: data.types,
                            spriteFront: data.sprites.front_default,
                            spriteBack: data.sprites.back_default,
                        }
                        setPokemonList(singlePokemon)
                        localStorage.setItem("fetch_cache", JSON.stringify({
                            ...cache,
                            [url]: data
                        }))
                        setPokemonsLoading(false)
                    })
            }

            return {data}

        }))

}

useEffect(() => {
    usePokemons(next)
}, [])


