import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import useSWR from "swr";
import { useRouter } from "next/router";

import Loader from "@/components/loader";
import GoBackBtn from "@/components/goBackBtn";
import Participation from "@/components/Participation";
import NotFound from "@/components/notFound";
import FavoriteBtn from "@/components/FavoriteBtn";

import { initAxios } from "@/lib/axios";
import { calculateAge } from "@/lib/helpers";
import Link from "next/link";

initAxios();

const baseUrlBig = "https://image.tmdb.org/t/p/original/";

export default function PersonDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const requestUrl = `https://api.themoviedb.org/3/person/${id}?append_to_response=images%2Ccombined_credits&language=en-US`;

  const { data, error, isLoading } = useSWR(requestUrl, fetchPersonData);

  
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

  const [showFullText, setShowFullText] = useState(false);
  const [showFullButton, setShowFullButton] = useState(true);

  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseInt(getComputedStyle(textRef.current).lineHeight);
      const maxHeight = lineHeight * 6;
      const actualHeight = textRef.current.clientHeight;

      if (actualHeight < maxHeight) {
        setShowFullButton(false);
      }
    }
  }, [data]);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  const keysToExclude = ["combined_credits", "images"];
  const filteredObject = { ...data };
  keysToExclude.forEach((key) => {
    delete filteredObject[key];
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error || !data) {
    return <NotFound />;
  }

  return (
    <div className="text-white md:px-32">
      <div className="flex justify-between">
        <GoBackBtn />
        <FavoriteBtn entity={filteredObject} type="people" />
      </div>

      <div className="flex flex-col lg:flex-row my-4 md:my-10 rounded-md bg-gray-950">
        <Link
          href={
            data.images.profiles.length == 0
              ? "#"
              : `/gallery/${id}?name=${data.name}`
          }
          className="flex flex-col justify-between text-left bg-center bg-cover cursor-pointer group bg-gray-500 p-4 rounded-md"
          style={{
            backgroundImage: `linear-gradient(rgba(50, 0, 114, 0.2), rgba(50, 0, 114, 0.4)), url(${
              baseUrlBig + data.profile_path
            })`,
            minHeight: "210px",
            minWidth: "260px",
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
                fill="#ffffff"
                stroke="#ffffff"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="flex justify-self-end font-medium text-md group-hover:underline lg:text-2xl lg:font-semibold text-gray-100">
            Visit the gallery
          </h2>
        </Link>
        <div className="p-4 md:py-8 md:px-12">
          <h1 className="text-4xl md:text-5xl font-extralight">{data.name}</h1>
          <p className="text-md italic mb-4 text-gray-400">Person ID: {id}</p>
          <div className="text-lg md:text-2xl">
            <p>
              Age:{" "}
              {data.birthday ? (
                <>
                  {calculateAge(data.birthday)}{" "}
                  <span className="italic">({data.birthday})</span>
                </>
              ) : (
                "no data"
              )}
            </p>
            <p>Place of birth: {data.place_of_birth || "no data"}</p>
            <p>Known for: {data.known_for_department || "no data"}</p>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-semibold">Biography:</p>
            {!data.biography ? (
              <NotFound />
            ) : (
              <>
                <p
                  ref={textRef}
                  className={`${
                    showFullText ? "" : "line-clamp-6"
                  } mt-2 text-justify`}
                >
                  {data.biography}
                </p>

                {showFullButton && (
                  <button
                    onClick={toggleText}
                    className="text-violet-400 border border-violet-400 rounded-md p-2 hover:underline focus:outline-none mx-auto block mt-4 md:mt-8"
                  >
                    {showFullText ? "Read Less" : "Read More"}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Participation
        data={[...data.combined_credits.cast, ...data.combined_credits.crew]}
        title="Participated in:"
      />
    </div>
  );
}
