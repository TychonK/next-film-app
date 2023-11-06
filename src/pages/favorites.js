import { useState, useEffect } from "react";
import Link from "next/link";

const baseUrlImg = "https://image.tmdb.org/t/p/w500/";

const MovieCard = ({ data }) => (
  <>
    <img
      className="w-full"
      src={baseUrlImg + data.poster_path}
      alt={data.title}
    />
    <div>
      <div className="text-center font-bold text-xl mb-2">{data.title}</div>
      <p className="text-gray-700 text-base text-justify line-clamp-4">{data.overview}</p>
    </div>
    <div className="px-6 py-4">
      <Link
        href={`/movie/${data.id}`}
        className="text-blue-500 hover:underline"
      >
        Details
      </Link>
    </div>
  </>
);

const TVCard = ({ data }) => (
  <>
    <img
      className="w-full"
      src={baseUrlImg + data.poster_path}
      alt={data.name}
    />
    <div>
      <div className="text-center font-bold text-xl mb-2">{data.name}</div>
      <p className="text-gray-700 text-base text-justify line-clamp-4">
        {data.overview}
      </p>
    </div>
    <div className="px-6 py-4">
      <Link href={`/tv/${data.id}`} className="text-blue-500 hover:underline">
        Details
      </Link>
    </div>
  </>
);

const PeopleCard = ({ data }) => (
  <>
    <img
      className="w-full"
      src={baseUrlImg + data.profile_path}
      alt={data.name}
    />
    <div>
      <div className="text-center font-bold text-xl mb-2">{data.name}</div>
      <p className="text-gray-700 text-base text-justify line-clamp-4">
        {data.biography}
      </p>
    </div>
    <div className="px-6 py-4">
      <Link
        href={`/people/${data.id}`}
        className="text-blue-500 hover:underline"
      >
        Details
      </Link>
    </div>
  </>
);

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

  if (!(favoriteFilms.length > 0)) {
    return (
      <>
        <h1 className="text-4xl font-bold leading-md:text-5xl">
          There is nothing in this section yet, go ahead and find something you
          like
        </h1>
        <img
          src="/film.svg"
          className="absolute inset-x-1/2 inset-y-1/2 -translate-y-1/3 -translate-x-1/2 w-80 text-gray-100 fill-gray-400"
        />
      </>
    );
  }

  return (
  <div className="flex flex-wrap justify-around">
      {
        favoriteFilms.map((entity) => (
        <div
          key={entity.data.id}
          className="max-w-xs overflow-hidden shadow-lg p-6 mt-4 bg-gray-200"
        >
          {entity.type === "movie" && <MovieCard data={entity.data} />}
          {entity.type === "tv" && <TVCard data={entity.data} />}
          {entity.type === "people" && <PeopleCard data={entity.data} />}
          <button
            className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            onClick={() => toggleFavorite(entity.data.id, entity.type)}
          >
            Remove
          </button>
        </div>
        ))
      }
    </div>
  )
}
