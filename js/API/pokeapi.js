
export const getPokemons = (successCallback) => {
    fetch("https://pokeapi.co/api/v2/pokemon/")
        .then((r) => r.json())
        .then((data) => {
            if (data.error === false && typeof successCallback === "function") {
                successCallback(data.data);
                console.log(data)
            }
        })
        .catch((err) => console.log(err));
};