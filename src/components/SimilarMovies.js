import React from "react";
import Link from "next/link";

import NotFound from "./notFound";

export default function SimilarMovies({ similarData }) {
  if (!similarData || similarData.length === 0) {
    return <NotFound/>;
    }
    
    const sortedData = similarData.sort((a, b) => b.popularity - a.popularity);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Similar Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedData.slice(0, 8).map((movie) => (
          <Link
            href={`/films/${movie.id}`}
            key={movie.id}
            className="border rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{movie.title}</h3>
              <p className="text-gray-500">{movie.release_date}</p>
              <p className="text-gray-700 mt-2">{movie.overview}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
