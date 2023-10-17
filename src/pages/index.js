import React from 'react';
import axios from 'axios';
import useSWR from "swr";

import Loader from '@/components/loader';
import Card from '@/components/card';

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
  const { data, error, isLoading } = useSWR(
    "https://api.themoviedb.org/3/trending/movie/week?language=en-US",
    fetchData
  );

  async function fetchData (url) {
    const dataObj = {}

    await axios
      .get(url)
      .then(function (res) {
        dataObj.films = res.data.results;
      })
      .catch((er) => {
        console.log(er);
      })
    return dataObj
  };

  return (
    <>
      <h1 className="text-4xl font-bold leadi md:text-5xl text-center">
        Check out the latest week's trends
      </h1>

      {isLoading && <Loader />}

      <ul className="flex flex-row flex-wrap justify-around">
        {data &&
          data.films.map((mov) => {
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
