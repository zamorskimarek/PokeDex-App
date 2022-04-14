import React from "react";
import ReactDOM from "react-dom";
import Pokedex from "./pokedex";

const App = () => {
    return (
        <>
            <Pokedex></Pokedex>
        </>
    )
}

ReactDOM.render(<App></App>, document.getElementById("app"));
