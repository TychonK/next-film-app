import { useState, useEffect } from "react";

import { toggleFavorite } from "@/lib/helpers";

export default function Favorites() {
    const [favoriteFilms, setFavoriteFilms] = useState([]);

    useEffect(() => {
      const favoritesJSON = localStorage.getItem("favorites");
      if (favoritesJSON) {
        setFavoriteFilms(JSON.parse(favoritesJSON));
      }
    }, []);

    const toggleFavorite = (entityId, entityType) => {
      const updatedFavorites = favoriteFilms.filter(
        (entity) => !(entity.id === entityId && entity.type === entityType)
      );
      setFavoriteFilms(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return (
        favoriteFilms.map((entity) => (
          <div key={entity.id}>
            <span>{`entity type: ${entity.type} entity id: ${entity.id}`}</span>
            <button onClick={() => toggleFavorite(entity.id, entity.type)}>
              Remove from Favorites
            </button>
          </div>
        ))
    );
}
