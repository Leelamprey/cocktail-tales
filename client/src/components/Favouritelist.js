import React from "react"
import { getFavouritesOfUser } from "../api";

const Favouritelist = () => {
  let fav = getFavouritesOfUser();
  console.log(fav);
  
  
  
  
  
  
  
  
  
  
  
  
  return fav;
 }

export default Favouritelist