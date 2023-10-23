import React from "react";
import Link from "next/link";

import NotFound from "./notFound";

export default function SimilarMovies({ data, title }) {
  if (!data || data.length === 0) {
    return <></>;
  }
    
  const sortedData = data.sort((a, b) => b.popularity - a.popularity);
  console.log(sortedData)

  return (
    <div className="mb-8">
      {!data && <NotFound />}
      <h2 className="text-7xl font-semibold mt-16 break-normal break-all">
        {title}
      </h2>
      <div className="mt-8 flex flex-row flex-wrap gap-12 justify-between">
        {sortedData.slice(0, 8).map((movie) => (
          <Link
            href={
              movie.media_type == "movie"
                ? `/films/${movie.id}`
                : `/tv/${movie.id}`
            }
            key={movie.id}
            className="rounded-lg overflow-hidden shadow-lg w-64 duration-200 hover:scale-105"
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
                className="text-lg font-semibold truncate"
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
    </div>
  );
};
