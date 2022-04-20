const BASE_URL = "http://localhost:3001";

export async function getFavouritesOfUser() {
  const response = await fetch(`${BASE_URL}/all`, {
    headers: {
      ...getTokenHeaders(),
    },
  });
  const data = await response.json();
  return data;
}

export async function login(email, password) {
  const reqBody = JSON.stringify({ email: email, password: password });
  const response = await fetch(`${BASE_URL}/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: reqBody,
  });
  const data = await response.json();
  return data;
}

export async function register(email, password) {
  const reqBody = JSON.stringify({ email: email, password: password });
  const response = await fetch(`${BASE_URL}/signup`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: reqBody,
  });
  if (response.status === 201) {
    return { success: true, err: null };
  }
  const data = await response.json();
  return { success: false, err: data };
}

function getTokenHeaders() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Go to login page ...");
    return;
  }
  return {
    Authorization: "Bearer " + token,
  };
}

export async function favouriteCocktail(cocktailId) {
  const reqBody = JSON.stringify({ cocktailId });
  const authHeaders = getTokenHeaders();
  const response = await fetch(`${BASE_URL}/favourites`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeaders,
    },
    method: "POST",
    body: reqBody,
  });
  return response.status === 201 ? true : false;
}

export async function getFavouritedCocktail(id) {
  const url = `${BASE_URL}/cocktailId/${id}`;
  const response = await fetch(url, {
    headers: {
      ...getTokenHeaders(),
    },
  });
  return await response.json();
}

export async function getCocktail(id) {
  try {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await response.json();
    if (data.drinks) {
      const {
        strDrink: name,
        strDrinkThumb: image,
        strAlcoholic: info,
        strCategory: category,
        strGlass: glass,
        strInstructions: instructions,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
      } = data.drinks[0];
      const ingredients = [
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
      ];
      const newCocktail = {
        name,
        image,
        info,
        category,
        glass,
        instructions,
        ingredients,
      };
      return newCocktail;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}
