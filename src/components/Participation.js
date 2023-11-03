import React, { useState } from "react";
import Link from "next/link";

export default function Participation({ data, title, type }) {
  if (!data || data.length === 0) {
    return <></>;
  }

  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState([]);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const toggleFilter = (filterType) => {
    filter.includes(filterType)
      ? setFilter(filter.filter((item) => item !== filterType))
      : setFilter([...filter, filterType]);
  };

    const resultMap = {};

    data.forEach((obj) => {
      const id = obj.id;
      if (!resultMap[id]) {
        resultMap[id] = { id };
      }

      Object.keys(obj).forEach((key) => {
        if (key !== "id" && !resultMap[id].hasOwnProperty(key)) {
          resultMap[id][key] = obj[key];
        }
      });
    });

    const noDuplicateData = Object.values(resultMap);

    const filteredData = noDuplicateData.filter((movie) => {
      if (filter.length === 0) {
        return true;
      } else {
        return filter.includes(movie.media_type);
      }
    });

    const sortedData = filteredData.sort((a, b) => b.popularity - a.popularity);

  return (
    <div className="mb-8">
      <h2 className="text-7xl text-center font-semibold mt-16 break-normal break-all relative pseudo-title">
        {title}
      </h2>
      <div className="flex items-center -mx-4 mt-8 space-x-8 text-xl sm:justify-center flex-nowrap text-gray-100">
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
      </div>
      <div className="mt-8 flex flex-row flex-wrap gap-12 justify-center">
        {sortedData.map((movie, index) => (
          <Link
            href={
              movie.media_type == "tv" || type == "tv"
                ? `/tv/${movie.id}`
                : `/films/${movie.id}`
            }
            key={movie.id}
            className="rounded-lg overflow-hidden shadow-lg w-64 duration-200 group hover:scale-105"
            style={{ display: showAll || index < 8 ? "block" : "none" }}
          >
            <div
              className="image-container"
              style={{ height: "384px", overflow: "hidden" }}
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/film.svg"
                }
                alt={movie.title}
                className="bg-gray-950 h-full"
              />
            </div>
            <div className="p-4 h-full bg-gray-800">
              <h3
                className="text-lg font-semibold truncate group-hover:underline"
                title={movie.title || movie.name}
              >
                {movie.title || movie.name}
              </h3>
              {movie.character && movie.character.length != 0 && (
                <p className="text-gray-200 italic">Role: {movie.character}</p>
              )}
              {movie.job && movie.job.length != 0 && (
                <p className="text-gray-200 italic">Job: {movie.job}</p>
              )}
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
}
