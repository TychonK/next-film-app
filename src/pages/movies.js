import { useState } from 'react';
import axios from 'axios';

import Layout from '@/components/Layout';
import Loader from "@/components/loader";
import Card from "@/components/card";

const API_BEARER = process.env.NEXT_PUBLIC_API_BEARER;

axios.defaults.headers.common["Authorization"] = "Bearer ".concat(API_BEARER);

export default function Movies() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleDataReceived = async (query) => {  
        setLoading(true);
        const dataObj = {};
        
        await axios
          .get(
            `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=en-US`
          )
          .then(function (res) {
            dataObj.films = res.data.results;
          })
          .catch((er) => {
            console.log(er);
          });
        
        await axios
          .get("https://api.themoviedb.org/3/genre/movie/list?language=en")
          .then(function (res) {
            dataObj.genres = res.data.genres;
          })
          .catch((er) => {
            console.log(er);
          })
          .finally(() => {
            console.log(dataObj);
            setData(dataObj);
            setLoading(false);
        });
    }

    return (
      <Layout onDataReceived={handleDataReceived}>
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