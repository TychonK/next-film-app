import React, { useState, useEffect } from "react";

export default function FavoriteBtn({ entityId, type}) {
  const [favoriteFilms, setFavoriteFilms] = useState([]);

  useEffect(() => {
    const favoritesJSON = localStorage.getItem("favorites");
    if (favoritesJSON) {
      setFavoriteFilms(JSON.parse(favoritesJSON));
    }
  }, []);

  const isFavorite = favoriteFilms.some(
    (entity) => entity.id === entityId && entity.type === type
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      const updatedFavorites = favoriteFilms.filter(
        (entity) => !(entity.id === entityId && entity.type === type)
      );
      setFavoriteFilms(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [...favoriteFilms, { id: entityId, type: type }];
      setFavoriteFilms(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  return (
    <button onClick={toggleFavorite}>
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
}
