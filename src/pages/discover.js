import React from "react";
import axios from "axios";
import useSWR from "swr";
import { useRouter } from "next/router";

import Card from "@/components/CardFilm";
import Placeholder from "@/components/placehoder";
import NotFound from "@/components/notFound";

import { fetchGenresMov } from "@/lib/fetchGenres";
import { initAxios } from "@/lib/axios";

initAxios();

export async function getStaticProps() {
  const allGenres = await fetchGenresMov();
  return {
    props: {
      genres: allGenres.genres,
    },
  };
}

export default function Home({ genres }) {
  const router = useRouter();
  const { search } = router.query;

  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US`,
    fetchData
  );

  async function fetchData(url) {
    const dataObj = {};

    if (search == undefined || search == "") {
      return;
    }

    await axios
      .get(url)
      .then(function (res) {
        dataObj.films = res.data.results;
      })
      .catch((er) => {
        console.log(er);
      });
    if (dataObj.films.length == 0) {
      throw new Error("No films found by such query");
    }
    return dataObj;
  }

  return (
    <>
      <h1 className="text-4xl font-bold leadi md:text-5xl">
        {!search ? (
          "Search for movies and more..."
        ) : (
          <>
            The search results for{" "}
            <span className="italic underline">{search}</span>
          </>
        )}
      </h1>

      {isLoading && (
        <div className="flex flex-row flex-wrap">
          <Placeholder number={8} />
        </div>
      )}

      {!search && (
        <svg
          viewBox="0 0 512 512"
          className="absolute inset-x-1/2 inset-y-1/2 -translate-y-1/2 -translate-x-1/2 w-80 text-gray-100 fill-gray-400"
        >
          <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
        </svg>
      )}
      <ul className="flex flex-row flex-wrap mt-12 justify-between gap-y-10">
        {(error || !data) && <NotFound />}
        {data &&
          data.films.map((mov) => {
            if (mov.overview.length == 0) {
              return null;
            }
            const movGenres = [];

            mov.genre_ids.forEach((id) => {
              genres.forEach((genre) => {
                genre.id == id && movGenres.push(genre.name);
              });
            });

            return <Card movData={mov} genres={movGenres} />;
          })}
      </ul>
    </>
  );
}
