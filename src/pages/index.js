import React from "react";
import axios from "axios";
import useSWR from "swr";

import ScrollContainer from "@/components/ScrollContainer";
import Loader from "@/components/loader";
import Title2 from "@/components/Title2";
import CardFilm from "@/components/CardFilm";
import CardTv from "@/components/CardTv";
import CardPpl from "@/components/CardPpl";

import { fetchGenresMov, fetchGenresTv } from "@/lib/fetchGenres";
import { initAxios } from "@/lib/axios";

initAxios();

export async function getStaticProps() {
  const allGenresMov = await fetchGenresMov();
  const allGenresTv = await fetchGenresTv();
  return {
    props: {
      genresMov: allGenresMov.genres,
      genresTv: allGenresTv.genres,
    },
  };
}

export default function Home({ genresMov, genresTv }) {
  const {
    data: filmData,
    error: filmError,
    isLoading: filmIsLoading,
  } = useSWR(
    "https://api.themoviedb.org/3/trending/movie/week?language=en-US",
    fetchFilmData
  );

  const {
    data: tvData,
    error: tvError,
    isLoading: tvIsLoading,
  } = useSWR(
    "https://api.themoviedb.org/3/trending/tv/week?language=en-US",
    fetchTvData
    );
  
    const {
      data: pplData,
      error: pplError,
      isLoading: pplIsLoading,
    } = useSWR(
        "https://api.themoviedb.org/3/trending/person/week?language=en-US",
        fetchPplData
    );

  async function fetchFilmData(url) {
    const dataObj = {};

    await axios
      .get(url)
      .then(function (res) {
        dataObj.films = res.data.results;
      })
      .catch((er) => {
        console.log(er);
      });
    return dataObj;
  }

  async function fetchTvData(url) {
    const dataObj = {};

    await axios
      .get(url)
      .then(function (res) {
        dataObj.tv = res.data.results;
      })
      .catch((er) => {
        console.log(er);
      });
    return dataObj;
  }

  async function fetchPplData(url) {
    const dataObj = {};

    await axios
      .get(url)
      .then(function (res) {
        dataObj.ppl = res.data.results;
      })
      .catch((er) => {
        console.log(er);
      });
    return dataObj;
  }

  return (
    <>
      <h1 className="text-6xl md:text-9xl uppercase font-medium leadi text-center text-transparent bg-clip-text bg-gradient-to-b from-purple-700 to-pink-600">
        Trending
      </h1>

      <div className="horizontal-fade relative">   
          <Title2 text="Movies" />

          {filmIsLoading && <Loader />}

          <ScrollContainer scrollTime={3000} containerId="movie">
            {filmData &&
              filmData.films.map((mov) => {
                const movGenres = [];

                mov.genre_ids.forEach((id) => {
                  genresMov.forEach((genre) => {
                    genre.id == id && movGenres.push(genre.name);
                  });
                });

                return <CardFilm movData={mov} genres={movGenres} />;
              })}
          </ScrollContainer>
      </div>

      <div className="horizontal-fade relative">
        <Title2 text="Series" />

        {tvIsLoading && <Loader />}

        <ScrollContainer scrollTime={3200} containerId="tv">
          {tvData &&
            tvData.tv.map((tv) => {
              const movGenres = [];

              tv.genre_ids.forEach((id) => {
                genresTv.forEach((genre) => {
                  genre.id == id && movGenres.push(genre.name);
                });
              });

              return <CardTv tvData={tv} genres={movGenres} />;
            })}
        </ScrollContainer>
      </div>

      <div className="horizontal-fade relative">
        <Title2 text="People" />

        {pplIsLoading && <Loader />}

        <ScrollContainer scrollTime={3500} containerId="ppl">
          {pplData &&
            pplData.ppl.map((person) => {
              return <CardPpl personData={person} />;
            })}
        </ScrollContainer>
      </div>
    </>
  );
}
