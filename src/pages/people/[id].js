import React, { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { useRouter } from "next/router";

import Loader from "@/components/loader";
import GoBackBtn from "@/components/goBackBtn";
import SimilarMovies from "@/components/SimilarMovies";
import NotFound from "@/components/notFound";

import { initAxios } from "@/lib/axios";
import { calculateAge } from "@/lib/helpers";

initAxios();

const baseUrlBig = "https://image.tmdb.org/t/p/original/";
const baseUrlSmall = "https://image.tmdb.org/t/p/w500/";

export default function PersonDetailsPage() {
    const router = useRouter();
    const { id } = router.query;

    const requestUrl =
      `https://api.themoviedb.org/3/person/${id}?append_to_response=images%2Ccombined_credits&language=en-US`;

    const { data, error, isLoading } = useSWR(requestUrl, fetchPersonData);
    
    const {
      data: allGenres,
      error: genresError,
      isLoading: genresLoading,
    } = useSWR(`https://api.themoviedb.org/3/genre/movie/list`, fetchGenres);

    async function fetchPersonData(url) {
      let data;
      await axios
        .get(url)
        .then(function (res) {
          data = res.data;
        })
        .catch((er) => {
          console.log(er);
        });
      return data;
    } 
  
    async function fetchGenres(url) {
      let data;
      await axios
        .get(url)
        .then(function (res) {
          data = res.data.genres;
        })
        .catch((er) => {
          console.log(er);
        });
      return data;
  }
  
    const [showFullText, setShowFullText] = useState(false);

    const toggleText = () => {
      setShowFullText(!showFullText);
    };
    
    if (isLoading) {
      return <Loader />;
    }

    if (error || !data) {
      return <NotFound />;
    }

  return (
    <div className="text-white px-4 md:px-32">
      <GoBackBtn />
      <div className="flex flex-row my-12 rounded-md bg-gray-950">
        <div
          className="flex flex-col justify-between text-left bg-center bg-cover cursor-pointer group bg-gray-500 p-4 rounded-md"
          style={{
            backgroundImage: `linear-gradient(rgba(50, 0, 114, 0.3), rgba(50, 0, 114, 0.5)), url(${
              baseUrlBig + data.images.profiles[0].file_path
            })`,
          }}
        >
          <div className="flex justify-between items-center">
            <p className="font-semibold text-2xl">
              [ {data.images.profiles.length} ]
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 100 100"
              fill="none"
            >
              <circle cx="50" cy="50" r="45" fill="transparent" />
              <path
                d="M36.4444 22.5951V77.4051L77.4056 50L36.4444 22.5951Z"
                fill="#FF6347"
                stroke="#FF6347"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <h2 className="flex justify-self-end font-medium text-md group-hover:underline lg:text-2xl lg:font-semibold text-gray-100">
            Visit the gallery
          </h2>
        </div>
        <div className="py-8 px-12">
          <h1 className="text-4xl font-extralight">{data.name}</h1>
          <p className="text-2xl mt-7">Person ID: {id}</p>
          <p className="text-2xl">
            Age: {calculateAge(data.birthday)}{" "}
            <span className="italic">({data.birthday})</span>
          </p>
          <p className="text-2xl">Place of birth: {data.place_of_birth}</p>
          <p className="text-2xl">Known for: {data.known_for_department}</p>
        </div>
      </div>
      <div>
        <p className="text-6xl font-semibold">Biography:</p>
        <p className={`line-clamp-${showFullText ? "none" : "6"} mt-4`}>
          {data.biography}
        </p>
        <button
          onClick={toggleText}
          className="text-violet-400 hover:underline focus:outline-none ml-auto block"
        >
          {showFullText ? "Read Less" : "Read More"}
        </button>
      </div>
      <SimilarMovies
        data={data.combined_credits.cast}
        title="Participated in"
      />
    </div>
  );
}
