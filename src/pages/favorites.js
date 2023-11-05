import { useState, useEffect } from "react";

import Link from "next/link";

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
        (entity) => !(entity.data.id === entityId && entity.type === entityType)
      );
      setFavoriteFilms(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return favoriteFilms.map((entity) => (
      <div>
        <Link href={`/${entity.type}/${entity.data.id}`} key={entity.data.id}>
          <p>{`Type: ${entity.type} id: ${entity.data.id}`}</p>
        </Link>
        <button className="bg-red-400" onClick={() => toggleFavorite(entity.data.id, entity.type)}>
          Remove from Favorites
        </button>
      </div>
    ));
}
