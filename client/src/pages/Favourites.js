import React, { useEffect, useState } from "react";
import { getCocktail, getFavouritesOfUser } from "../api";

const Favourites = () => {
  const [cocktails, setCocktails] = useState([]);

  async function getFavouriteCocktails() {
    const favouriteCocktails = await getFavouritesOfUser();
    const cocktailDetails = [];

    for (const f of favouriteCocktails) {
      const cocktail = await getCocktail(f.cocktailId);
      cocktailDetails.push(cocktail);
    }
    return cocktailDetails;
  }

  useEffect(() => {
    getFavouriteCocktails().then((data) => {
      setCocktails(data);
    });
  }, []);

  return (
    <section className="section about-section">
      <h1 className="section-title">Your Favorites</h1>{" "}
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Links</th>
          </tr>
        </thead>
        <tbody>
          {cocktails === null
            ? "Loading ..."
            : cocktails.map((f) => {
                return (
                  <tr key={f.name}>
                    <td>
                      <h1>{f?.name}</h1>
                      <img src={f?.image} alt={f.name}></img>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </section>
  );
};

export default Favourites;
