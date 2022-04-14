import {Pokemon} from "./pokemon";
import React from "react";


export const searchedPokemon = ({searchedPokemon}) => {
  return (
      <>
          <div onClick={setSearchedPokemon(null)}>X</div>
          <Pokemon {...searchedPokemon}></Pokemon>
      </>
  )
}