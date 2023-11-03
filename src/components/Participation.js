import React, { useState } from "react";
import Link from "next/link";

import NotFound from "./notFound";

export default function Participation({ data, title, type }) {
  if (!data || data.length === 0) {
    return <></>;
  }

    const [showAll, setShowAll] = useState(false);
    const [filter, setFilter] = useState([]);
    const [search, setSearch] = useState("");

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const toggleFilter = (filterType) => {
    filter.includes(filterType)
      ? setFilter(filter.filter((item) => item !== filterType))
      : setFilter([...filter, filterType]);
    };
    
    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

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
      if (filter.length == 0) {
        return true;
      } else {
        return filter.includes(movie.media_type);
      }
    });

    const searchedData = filteredData.filter((movie) => {
       if (movie.title) {
         return movie.title.toLowerCase().includes(search.toLowerCase());
       } else {
         return movie.name.toLowerCase().includes(search.toLowerCase());
       }
    })

  return (
    <div className="mb-8">
      <h2 className="text-7xl text-center font-semibold mt-16 break-normal break-all relative pseudo-title">
        {title}
      </h2>
      <div className="flex items-center -mx-4 mt-8 space-x-8 text-xl sm:justify-center flex-nowrap text-gray-100">
        <div className="flex overflow-hidden rounded-md bg-gray-900 text-gray-100">
          <input
            type="search"
            name="search"
            placeholder="Search..."
            className="bg-transparent focus:outline-none focus:bg-gray-950 text-gray-100 p-3 w-full h-full border-violet-400 border-b-4"
            onChange={(e) => {
              handleSearchChange(e);
            }}
          />
          <div className="flex items-center justify-center px-4 bg-violet-400 text-gray-800">
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
      </div>
      <div className="mt-8 flex flex-row flex-wrap gap-12 justify-center">
        {searchedData.length == 0 ? (
          <NotFound />
        ) : (
          searchedData.map((movie, index) => (
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
                  <p className="text-gray-200 italic">
                    Role: {movie.character}
                  </p>
                )}
                {movie.job && movie.job.length != 0 && (
                  <p className="text-gray-200 italic">Job: {movie.job}</p>
                )}
                <p className="text-gray-400">
                  {movie.release_date || movie.first_air_date}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
      {searchedData.length >= 8 && (
        <button
          className="text-lg bg-violet-400 duration-100 hover:bg-violet-500 px-4 py-2 mt-8 mx-auto block rounded-md"
          onClick={toggleShowAll}
        >
          {showAll ? "show less" : "show all"}
        </button>
      )}
    </div>
  );
}
