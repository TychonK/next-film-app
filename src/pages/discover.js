import React, {useState, useEffect} from "react";
import axios from "axios";
import useSWR from "swr";
import { useRouter } from "next/router";

import NotFound from "@/components/notFound";
import Loader from "@/components/loader";

import MovieCard from '@/components/discover/MovieCard';
import TvShowCard from '@/components/discover/TvShowCard';
import PersonCard from "@/components/discover/PersonCard";

import { fetchGenresMov, fetchGenresTv } from "@/lib/fetchGenres";
import { initAxios } from "@/lib/axios";

initAxios();

export async function getStaticProps() {
  const allGenresMov = await fetchGenresMov();
  const allGenresTv = await fetchGenresTv();
  return {
    props: {
      genresMov: allGenresMov.genres,
      genresTv: allGenresTv.genres
    },
  };
}

export default function Dicover({ genresMov, genresTv }) {
  const router = useRouter();
  const { search } = router.query;

  async function fetchData(url) {
    const dataObj = {};

    console.log(url)

    if (!url) {
      return
    }

    await axios
      .get(url)
      .then(function (res) {
        dataObj.results = res.data.results.slice(0, 5);
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
      const images = ["search-1.jpg", "search-2.jpg", "search-3.jpg"];
      const randomIndex = Math.floor(Math.random() * images.length);
      return images[randomIndex];
    };

  return (
    <>
      <div
        className="w-screen bg-cover bg-center p-32 -mt-12 -mx-16 h-slider relative"
        style={{ backgroundImage: `url(/${getRandomImage()})` }}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-violet-950 opacity-70 z-1" />
        <div className="relative z-10 text-white">
          <h1 className="text-5xl font-light">Search for movies, actors and more</h1>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 mt-8 border-gray-300 rounded-l-full focus:outline-none focus:ring focus:border-blue-300 text-gray-700"
          />
          <button
            onClick={handleSearch}
            className="bg-purple-600 text-white px-4 py-2 rounded-r-full focus:outline-none"
          >
            Search
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <span
          onClick={() => handleSearchTypeChange("movie")}
          className={`cursor-pointer px-4 py-2 ${
            searchType === "movie" ? "bg-purple-600 text-white" : "bg-gray-300"
          } rounded-l`}
        >
          Movie
        </span>
        <span
          onClick={() => handleSearchTypeChange("tv")}
          className={`cursor-pointer px-4 py-2 ${
            searchType === "tv" ? "bg-purple-600 text-white" : "bg-gray-300"
          }`}
        >
          TV
        </span>
        <span
          onClick={() => handleSearchTypeChange("person")}
          className={`cursor-pointer px-4 py-2 ${
            searchType === "person" ? "bg-purple-600 text-white" : "bg-gray-300"
          }`}
        >
          People
        </span>
        <span
          onClick={() => handleSearchTypeChange("multi")}
          className={`cursor-pointer px-4 py-2 ${
            searchType === "multi" ? "bg-purple-600 text-white" : "bg-gray-300"
          } rounded-r`}
        >
          All
        </span>

        <div className="ml-4">
          <label
            className={`text-gray-700 ${
              searchType == "multi" || searchType == "person"
                ? "opacity-30"
                : ""
            }`}
          >
            Year:
          </label>
          <select
            value={searchYear}
            disabled={
              (searchType == "multi" || searchType == "person") && "disabled"
            }
            onChange={(e) => handleSearchYearChange(e.target.value)}
            className="px-4 py-2 ml-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 text-gray-700 disabled:opacity-20"
          >
            <option key="default" value={""}>
              ...
            </option>
            {generateYearOptions()}
          </select>
        </div>
        <button
          onClick={handleSearch}
          className="bg-purple-600 text-white px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
        >
          Search
        </button>
      </div>

      {isLoading && <Loader />}
      {error && <p>Error loading data</p>}

      {data && (
        <div>
          {data.results.length > 0 && (
            <>
              {data.results.filter((result) => result.media_type === "movie")
                .length > 0 && (
                <div>
                  <h2>Movies</h2>
                  <div className="divide-y divide-gray-200">
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
                <div>
                  <h2>TV Shows</h2>
                  <div className="divide-y divide-gray-200">
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
                <div>
                  <h2>People</h2>
                  <div className="divide-y divide-gray-200">
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
              <div>
                <h2>Movies</h2>
                <div className="divide-y divide-gray-200">
                  {data.results.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              </div>
            )}

          {data.results.length > 0 && searchRequest.includes("search/tv") && (
            <div>
              <h2>TV shows</h2>
              <div className="divide-y divide-gray-200">
                {data.results.map((tvShow) => (
                  <TvShowCard key={tvShow.id} tvShow={tvShow} />
                ))}
              </div>
            </div>
          )}

          {data.results.length > 0 &&
            searchRequest.includes("search/person") && (
              <div>
                <h2>People</h2>
                <div className="divide-y divide-gray-200">
                  {data.results.map((person) => (
                    <PersonCard key={person.id} person={person} />
                  ))}
                </div>
              </div>
            )}
          {data.results.length === 0 && <NotFound />}
        </div>
      )}
    </>
  );
}
