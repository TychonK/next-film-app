import React from "react";

import Link from "next/link";

const MovieCard = ({ movie }) => {
  return (
    <Link href={`/movie/${movie.id}`} className="block py-1 group">
      <div className="flex pr-4 items-center xl:w-1/2 space-x-4 rtl:space-x-reverse bg-stone-50 rounded border-b border-gray-300">
        <div className="flex-shrink-0">
          <img
            className="w-20 h-28 rounded-l object-cover object-center bg-gray-300"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                : "/no-image.svg"
            }
            alt={movie.title}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {movie.title}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            Release: {movie.release_date}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900  group-hover:underline">
          more
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
