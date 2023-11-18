import React from "react";

import Link from "next/link";

const TvShowCard = ({ tvShow }) => {
  return (
    <Link href={`/tv/${tvShow.id}`} className="block py-4 group">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <div className="flex-shrink-0">
          <img
            className="w-20 h-28 rounded-l"
            src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
            alt={tvShow.name}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {tvShow.name}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            First air: {tvShow.first_air_date}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 group-hover:underline">
          more
        </div>
      </div>
    </Link>
  );
};

export default TvShowCard;
