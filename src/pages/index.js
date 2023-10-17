import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/router";

import Layout from '@/components/Layout';
import Loader from '@/components/loader';
import Card from '@/components/card';

const API_BEARER = process.env.NEXT_PUBLIC_API_BEARER;

axios.defaults.headers.common["Authorization"] = "Bearer ".concat(API_BEARER);

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true)
    const dataObj = {}
    await axios
      .get("https://api.themoviedb.org/3/trending/movie/week?language=en-US")
      .then(function (res) {
        dataObj.films = res.data.results;
      })
      .catch((er) => {
        console.log(er);
      })
    
    await axios
      .get("https://api.themoviedb.org/3/genre/movie/list?language=en")
      .then(function (res) {
        dataObj.genres = res.data.genres
      })
      .catch((er) => {
        console.log(er);
      })
      .finally(() => {
        console.log(dataObj)
        setData(dataObj)
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <h1 className="text-4xl font-bold leadi md:text-5xl text-center">
        Check out the latest week's trends
      </h1>

      {loading && <Loader />}

      <ul className="flex flex-row flex-wrap justify-around">
        {data &&
          data.films.map((mov) => {
            const movGenres = [];

            mov.genre_ids.forEach((id) => {
              data.genres.forEach((genre) => {
                genre.id == id && movGenres.push(genre.name);
              });
            });

            return <Card movData={mov} genres={movGenres} />;
          })}
      </ul>
    </Layout>
  );
}
