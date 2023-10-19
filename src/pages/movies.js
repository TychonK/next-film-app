import React from "react";
import axios from "axios";
import useSWR from "swr";
import { useRouter } from "next/router";

import Loader from "@/components/loader";
import Card from "@/components/CardFilm";
import Placeholder from "@/components/placehoder";
import NotFound from "@/components/notFound";

import { fetchGenres } from "@/lib/fetchGenres";
import { initAxios } from "@/lib/axios";

initAxios();

export async function getStaticProps() {
  const allGenres = await fetchGenres();
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

      <ul className="flex flex-row flex-wrap justify-around">
        {error && <NotFound />}
        {data &&
          data.films.map((mov) => {
            if (mov.overview.length == 0) {
              return null
            }
            const movGenres = [];

            mov.genre_ids.forEach((id) => {
              genres.forEach((genre) => {
                genre.id == id && movGenres.push(genre.name);
              });
            });

            return <Card movData={mov} genres={movGenres} />;
          })
          }
      </ul>
    </>
  );
}
