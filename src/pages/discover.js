import React, { useState, useEffect } from "react";
import axios from "axios";
import useSWR from "swr";
import { useRouter } from "next/router";

import NotFound from "@/components/notFound";
import Loader from "@/components/loader";

import MovieCard from '@/components/discover/MovieCard';
import TvShowCard from '@/components/discover/TvShowCard';
import PersonCard from "@/components/discover/PersonCard";

import Title2 from "@/components/Title2";

import { initAxios } from "@/lib/axios";

initAxios();

export default function Dicover() {
  const router = useRouter();
  const { search } = router.query;

  async function fetchData(url) {
    const dataObj = {};

    if (!url) {
      return
    }

    await axios
      .get(url)
      .then(function (res) {
        dataObj.results = res.data.results.slice(0, 10);
      })
      .catch((er) => {
        console.log(er);
      });
    
    return dataObj;
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("multi");
  const [searchYear, setSearchYear] = useState("");
  const [searchRequest, setSearchRequest] = useState(null);
  const [image, setImage] = useState(null)

  useEffect(() => {
    if (search && search.length != 0) {
      setSearchTerm(search);
      setSearchType("multi");
      setSearchRequest(
        `https://api.themoviedb.org/3/search/multi?query=${search}&include_adult=false&language=en-US&page=1`
      );
    } else {
      return
    }
  }, [search])

  const handleSearch = () => {
    setSearchRequest(
      `https://api.themoviedb.org/3/search/${searchType}` +
        `?query=${searchTerm}` +
        `${
          (searchType === "tv" || searchType === "movie") ?
          `&year=${searchYear}` : ""
        }` +
        `&include_adult=false&language=en-US&page=1`
    );
  };

   const handleSearchTypeChange = (type) => {
     setSearchType(type);
   };

  const handleSearchYearChange = (year) => {
    setSearchYear(year);
  };

   const generateYearOptions = () => {
     const currentYear = new Date().getFullYear();
     const years = Array.from(
       { length: currentYear - 1899 },
       (_, index) => currentYear - index
     );
     return years.map((year) => (
       <option key={year} value={year}>
         {year}
       </option>
     ));
   };

  const { data, error, isLoading } = useSWR(
     searchRequest,
    fetchData, 
  );
  
    const getRandomImage = () => {
      const images = [
        "search-1.jpg",
        "search-2.jpg",
        "search-3.jpg",
        "search-4.jpg",
        "search-5.jpg",
        "search-6.jpg",
        "search-7.jpg",
      ];
      const randomIndex = Math.floor(Math.random() * images.length);
      return images[randomIndex];
  };
  
  useEffect(() => {
    setImage(getRandomImage())
  }, [])

  return (
    <>
      <div
        className="w-screen bg-cover bg-center -mt-8 md:-mt-12 -ml-4 sm:-ml-8 md:-ml-12 lg:-ml-16 px-6 md:px-32 pt-10 md:pt-32 pb-16 relative rounded-b-xl overflow-hidden"
        style={{ backgroundImage: `url(/${image})` }}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-rose-900 opacity-70 z-1" />
        <div className="relative z-10 text-white">
          <h1 className="text-5xl drop-shadow">
            Discover movies, actors and more...
          </h1>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="py-3 px-2 sm:px-4 mt-12 w-40 md:w-1/2 border-gray-300 rounded-l-full focus:outline-none focus:ring focus:border-blue-300 text-gray-700"
          />
          <button
            onClick={handleSearch}
            className="py-3 px-2 sm:px-4 bg-purple-600 text-white rounded-r-full h-full focus:outline-none"
          >
            Search
          </button>
        </div>
        <div className="flex flex-wrap gap-y-3 mt-4 relative z-10">
          <span
            onClick={() => handleSearchTypeChange("movie")}
            className={`cursor-pointer px-2 sm:px-4 py-2 ${
              searchType === "movie" ? "bg-purple-600 text-white" : "bg-white"
            } rounded-l-full`}
          >
            Movie
          </span>
          <span
            onClick={() => handleSearchTypeChange("tv")}
            className={`cursor-pointer px-2 sm:px-4 py-2 ${
              searchType === "tv" ? "bg-purple-600 text-white" : "bg-white"
            }`}
          >
            TV
          </span>
          <span
            onClick={() => handleSearchTypeChange("person")}
            className={`cursor-pointer px-2 sm:px-4 py-2 ${
              searchType === "person" ? "bg-purple-600 text-white" : "bg-white"
            }`}
          >
            People
          </span>
          <span
            onClick={() => handleSearchTypeChange("multi")}
            className={`cursor-pointer px-2 sm:px-4 py-2 ${
              searchType === "multi" ? "bg-purple-600 text-white" : "bg-white"
            }`}
          >
            All
          </span>

          <div>
            <select
              value={searchYear}
              disabled={
                (searchType == "multi" || searchType == "person") && "disabled"
              }
              onChange={(e) => handleSearchYearChange(e.target.value)}
              className="px-4 py-2 h-full duration-300 rounded focus:outline-none focus:ring focus:border-blue-300 text-gray-700 disabled:opacity-20 rounded-r-full"
            >
              <option key="default" value={""}>
                year
              </option>
              {generateYearOptions()}
            </select>
          </div>
          <button
            onClick={handleSearch}
            className="bg-purple-600 mx-auto sm:ml-4 text-white px-4 py-2 rounded-full focus:outline-none focus:ring focus:border-blue-300"
          >
            Apply
          </button>
        </div>
      </div>

      <div className="py-8">
        {((!data && !isLoading) ||
          (!isLoading && data.results.length == 0)) && (
          <svg
            viewBox="0 0 512 512"
            className="w-64 h-64 mx-auto fill-gray-300"
          >
            <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
          </svg>
        )}
        {isLoading && <Loader />}
        {error && <p>Error loading data</p>}

        {data && (
          <div>
            {data.results.length > 0 && (
              <>
                {data.results.filter((result) => result.media_type === "movie")
                  .length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-4xl">Movies:</h2>
                    <div className="mt-4">
                      {data.results
                        .filter((result) => result.media_type === "movie")
                        .map((movie) => (
                          <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                  </div>
                )}

                {data.results.filter((result) => result.media_type === "tv")
                  .length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-4xl">TV shows:</h2>
                    <div className="mt-4">
                      {data.results
                        .filter((result) => result.media_type === "tv")
                        .map((tvShow) => (
                          <TvShowCard key={tvShow.id} tvShow={tvShow} />
                        ))}
                    </div>
                  </div>
                )}

                {data.results.filter((result) => result.media_type === "person")
                  .length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-4xl">People:</h2>
                    <div className="mt-4">
                      {data.results
                        .filter((result) => result.media_type === "person")
                        .map((person) => (
                          <PersonCard key={person.id} person={person} />
                        ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {data.results.length > 0 &&
              searchRequest.includes("search/movie") && (
                <div className="mb-8">
                  <h2 className="text-4xl">Movies:</h2>
                  <div className="mt-4">
                    {data.results.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </div>
                </div>
              )}

            {data.results.length > 0 && searchRequest.includes("search/tv") && (
              <div className="mb-8">
                <h2 className="text-4xl">TV shows:</h2>
                <div className="mt-4">
                  {data.results.map((tvShow) => (
                    <TvShowCard key={tvShow.id} tvShow={tvShow} />
                  ))}
                </div>
              </div>
            )}

            {data.results.length > 0 &&
              searchRequest.includes("search/person") && (
                <div className="mb-8">
                  <h2 className="text-4xl">People:</h2>
                  <div className="mt-4">
                    {data.results.map((person) => (
                      <PersonCard key={person.id} person={person} />
                    ))}
                  </div>
                </div>
              )}
            {data.results.length === 0 && searchTerm.length > 0 && <NotFound />}
          </div>
        )}
      </div>
    </>
  );
}
