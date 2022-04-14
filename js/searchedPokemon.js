import {Pokemon} from "./pokemon";
import React from "react";
import handleCloseSearched from "./pokedex"


export const SearchedPokemon = ({searchedPokemon}) => {
  return (
      <>
          <div onClick={handleCloseSearched}>X</div>
          <Pokemon {...searchedPokemon}></Pokemon>
      </>
  )
}