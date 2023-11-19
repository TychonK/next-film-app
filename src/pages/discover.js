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
        className="w-screen bg-cover bg-center p-32 -mt-12 -mx-16 h-slider relative"
        style={{ backgroundImage: `url(/${image})` }}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-violet-950 opacity-50 z-1" />
        <div className="relative z-10 text-white">
          <h1 className="text-5xl font-light drop-shadow">
            Search for movies, actors and more
          </h1>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-4 mt-12 border-gray-300 rounded-l-full focus:outline-none focus:ring focus:border-blue-300 text-gray-700"
          />
          <button
            onClick={handleSearch}
            className="p-4 bg-purple-600 text-white rounded-r-full h-full focus:outline-none"
          >
            Search
          </button>
        </div>
        <div className="flex mt-4 relative z-10">
          <span
            onClick={() => handleSearchTypeChange("movie")}
            className={`cursor-pointer px-4 py-2 ${
              searchType === "movie" ? "bg-purple-600 text-white" : "bg-white"
            } rounded-l-full`}
          >
            Movie
          </span>
          <span
            onClick={() => handleSearchTypeChange("tv")}
            className={`cursor-pointer px-4 py-2 ${
              searchType === "tv" ? "bg-purple-600 text-white" : "bg-white"
            }`}
          >
            TV
          </span>
          <span
            onClick={() => handleSearchTypeChange("person")}
            className={`cursor-pointer px-4 py-2 ${
              searchType === "person" ? "bg-purple-600 text-white" : "bg-white"
            }`}
          >
            People
          </span>
          <span
            onClick={() => handleSearchTypeChange("multi")}
            className={`cursor-pointer px-4 py-2 ${
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
            className="bg-purple-600 ml-4 text-white px-4 py-2 rounded-full focus:outline-none focus:ring focus:border-blue-300"
          >
            Apply
          </button>
        </div>
      </div>

      <div className="py-8">
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
            {data.results.length === 0 && <NotFound />}
          </div>
        )}
      </div>
    </>
  );
}
