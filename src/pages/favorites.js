import { useState, useEffect } from "react";

import { MovieCard, TvCard, PplCard } from "@/components/FavoriteCards";

import NotFound from "@/components/notFound";

export default function Favorites() {
  const [favoriteFilms, setFavoriteFilms] = useState([]);
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const favoritesJSON = localStorage.getItem("favorites");
    if (favoritesJSON) {
      setFavoriteFilms(JSON.parse(favoritesJSON));
    }
  }, []);

  const toggleFavorite = (entityId, entityType) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this item from your favorites?"
    );

    if (confirmed) {
      const updatedFavorites = favoriteFilms.filter(
        (entity) => !(entity.data.id === entityId && entity.type === entityType)
      );
      setFavoriteFilms(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  const toggleFilter = (filterType) => {
    filter.includes(filterType)
      ? setFilter(filter.filter((item) => item !== filterType))
      : setFilter([...filter, filterType]);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  if (!(favoriteFilms.length > 0)) {
    return (
      <>
        <h1 className="text-center text-2xl md:text-left md:text-4xl font-bold leading-md:text-5xl">
          There is nothing in this section yet, go ahead and find something you
          like
        </h1>
        <img
          src="/film.svg"
          className="absolute inset-x-1/2 inset-y-1/2 -translate-y-1/3 -translate-x-1/2 w-64 md:w-80 text-gray-100 fill-gray-400"
        />
      </>
    );
  }

  const filteredData = favoriteFilms.filter((element) => {
    if (filter.length == 0) {
      return true;
    } else {
      return filter.includes(element.type);
    }
  })

  const searchedData = filteredData.filter((element) => {
    if (element.data.title) {
      return element.data.title.toLowerCase().includes(search.toLowerCase());
    } else {
      return element.data.name.toLowerCase().includes(search.toLowerCase());
    }
  });

  return (
    <>
      <div className="flex flex-wrap items-center -mx-4 space-x-8 text-xl justify-center text-gray-100">
        <div className="flex overflow-hidden rounded-md text-gray-100">
          <input
            type="search"
            name="search"
            placeholder="Search..."
            className={`bg-transparent focus:outline-none text-gray-800 p-3 w-full h-full border-b-4 ${
              search.length > 0 ? "border-violet-400" : "border-gray-700"
            }`}
            onChange={(e) => {
              handleSearchChange(e);
            }}
          />
          <div className="flex items-center justify-center px-4 bg-gray-700 text-gray-800">
            <svg
              fill="currentColor"
              viewBox="0 0 512 512"
              className="w-6 h-6 text-gray-100"
            >
              <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
            </svg>
          </div>
        </div>
        <button
          rel="noopener noreferrer"
          href="#"
          className={`flex items-center flex-shrink-0 px-5 py-2 border-b-4 text-gray-400 ${
            filter.includes("movie") ? "border-violet-400" : "border-gray-700"
          }`}
          onClick={() => toggleFilter("movie")}
        >
          Movie
        </button>
        <button
          rel="noopener noreferrer"
          href="#"
          className={`flex items-center flex-shrink-0 px-5 py-2 border-b-4 text-gray-400 ${
            filter.includes("tv") ? "border-violet-400" : "border-gray-700"
          }`}
          onClick={() => toggleFilter("tv")}
        >
          TV show
        </button>
        <button
          rel="noopener noreferrer"
          href="#"
          className={`flex items-center flex-shrink-0 px-5 py-2 border-b-4 text-gray-400 ${
            filter.includes("people") ? "border-violet-400" : "border-gray-700"
          }`}
          onClick={() => toggleFilter("people")}
        >
          People
        </button>
      </div>
      {!(searchedData.length > 0) ? (
        <div className="max-w-lg mx-auto">
          <NotFound />
        </div>
      ) : (
        <div className="flex flex-wrap gap-8 mt-12">
          {searchedData.map((entity) => (
            <>
              {entity.type === "movie" && (
                <MovieCard
                  data={entity.data}
                  type={entity.type}
                  toggleFavorite={toggleFavorite}
                />
              )}
              {entity.type === "tv" && (
                <TvCard
                  data={entity.data}
                  type={entity.type}
                  toggleFavorite={toggleFavorite}
                />
              )}
              {entity.type === "people" && (
                <PplCard
                  data={entity.data}
                  type={entity.type}
                  toggleFavorite={toggleFavorite}
                />
              )}
            </>
          ))}
        </div>
      )}
    </>
  );  
}
