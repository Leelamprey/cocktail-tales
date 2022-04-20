import React from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
import { favouriteCocktail, getFavouritedCocktail, getCocktail } from "../api";

export default function SingleCocktail() {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [cocktail, setCocktail] = React.useState(null);
  const [isFavourite, setIsFavourite] = React.useState(true);

  async function handleSubmit(cocktailId) {
    favouriteCocktail(cocktailId);
  }

  React.useEffect(() => {
    setLoading(true);
    getCocktail(id).then((cocktail) => {
      setCocktail(cocktail);
      setLoading(false);
    });
    getFavouritedCocktail(id).then((data) => {
      setIsFavourite(data?.isFavourited);
    });
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  if (!cocktail) {
    return <h2 className="section-title">no cocktail to display</h2>;
  } else {
    const { name, image, category, info, glass, instructions, ingredients } =
      cocktail;

    return (
      <section className="section cocktail-section">
        <Link to="/" className="btn btn-primary">
          back to home
        </Link>
        <h2 className="section-title">{name}</h2>
        <div className="drink">
          <img src={image} alt={name}></img>
          <div className="drink-info">
            <p>
              <span className="drink-data">name :</span> {name}
            </p>
            <p>
              <span className="drink-data">category :</span> {category}
            </p>
            <p>
              <span className="drink-data">info :</span> {info}
            </p>
            <p>
              <span className="drink-data">glass :</span> {glass}
            </p>
            <p>
              <span className="drink-data">instructons :</span> {instructions}
            </p>
            <p>
              <span className="drink-data">ingredients :</span>
              {ingredients.map((item, index) => {
                return item ? <span key={index}> {item}</span> : null;
              })}
            </p>
          </div>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setIsFavourite(!isFavourite);
            handleSubmit(id);
          }}
        >
          {isFavourite === true ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </section>
    );
  }
}
