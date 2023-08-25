import { createContext } from "react";
import React, { useState } from "react";

export const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
  isFavorite: (id) => {},
});

export function FavoriteContextProvider(props) {
  const [favoriteMealIds, setFavoriteMealIds] = useState([]);

  const addFavorite = (id) => {
    setFavoriteMealIds((currentIds) => [...currentIds, id]);
  };
  const isFavorite = (mealId) => favoriteMealIds.includes(mealId);
  const removeFavorite = (id) => {
    setFavoriteMealIds((currentIds) => {
      return currentIds.filter((mealId) => mealId !== id);
    });
  };
  const value = {
    ids: favoriteMealIds,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
    isFavorite: isFavorite,
  };
  return (
    <FavoritesContext.Provider value={value}>
      {props.children}
    </FavoritesContext.Provider>
  );
}
