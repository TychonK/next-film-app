import React, { useState } from "react";
import Link from "next/link";

import NotFound from "./notFound";

export default function SimilarMovies({ data, title }) {
  if (!data || data.length === 0) {
    return <></>;
  }
    
  const sortedData = data.sort((a, b) => b.popularity - a.popularity);

  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="mb-8">
      {!data && <NotFound />}
      <h2 className="text-7xl text-center font-semibold mt-16 break-normal break-all">
        {title}
      </h2>
      <div className="mt-8 flex flex-row flex-wrap gap-12 justify-center">
        {sortedData.map((movie, index) => (
          <Link
            href={
              movie.media_type == "tv"
                ? `/tv/${movie.id}`
                : `/films/${movie.id}`
            }
            key={movie.id}
            className="rounded-lg overflow-hidden shadow-lg w-64 duration-200 group hover:scale-105"
            style={{ display: showAll || index < 8 ? "block" : "none" }}
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/no-image.svg"
              }
              alt={movie.title}
              className="bg-gray-400"
            />
            <div className="p-4 h-full bg-gray-800">
              <h3
                className="text-lg font-semibold truncate group-hover:underline"
                title={movie.title || movie.name}
              >
                {movie.title || movie.name}
              </h3>
              <p className="text-gray-400">
                {movie.release_date || movie.first_air_date}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <button
        className="text-lg bg-violet-400 duration-100 hover:bg-violet-500 px-4 py-2 mt-8 mx-auto block rounded-md"
        onClick={toggleShowAll}
      >
        {showAll ? "show less" : "show all"}
      </button>
    </div>
  );
};
