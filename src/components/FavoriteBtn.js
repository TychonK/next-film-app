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
      <button
        onClick={toggleFavorite}
        className="ml-auto text-gray-400 duration-100 hover:text-gray-200 flex font-medium items-center py-2 px-4 border-2 rounded-md border-gray-400"
      >
        {isFavorite ? (
          <>
            <p className="ml-2">Remove</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="stroke-violet-400 fill-violet-400"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </>
        ) : (
          <>
            <p className="ml-2">Add to favorites</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="stroke-gray-400"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </>
        )}
      </button>
    );
}
