import React from "react";
import axios from "axios";
import useSWR from "swr";

import ScrollContainer from "@/components/ScrollContainer";
import Loader from "@/components/loader";
import Title2 from "@/components/Title2";
import CardFilm from "@/components/CardMovie";
import CardTv from "@/components/CardTv";
import CardPpl from "@/components/CardPpl";
import CardFeatured from "@/components/CardFeatured";
import CardPopular from "@/components/CardPopular";

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
  

    const {
      data: featuredData,
      error: featuresErr,
      isLoading: featuredIsLoading,
    } = useSWR(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      fetchFeaturedData
    )
  
  const {
    data: popularData,
    error: popularErr,
    isLoading: popularIsLoading,
  } = useSWR(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    fetchPopularData
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

  async function fetchPopularData(url) {
    const dataObj = {};

    await axios
      .get(url)
      .then(function (res) {
        dataObj.popular = res.data.results;
      })
      .catch((er) => {
        console.log(er);
      });
    return dataObj;
  }

  async function fetchFeaturedData(url) {
    const dataObj = {};

    await axios
      .get(url)
      .then(function (res) {
        dataObj.featured = res.data.results.slice(0, 10);
        console.log(dataObj)
      })
      .catch((er) => {
        console.log(er);
      });
    return dataObj;
  }

  return (
    <>
      <div className="relative rounded-md">
        <Title2 text="Movies" subText="trending" />

        {filmIsLoading && <Loader />}

        <ScrollContainer containerId="movie" btnDark={true}>
          {filmData &&
            filmData.films.map((mov) => {
              const movGenres = [];

              mov.genre_ids.forEach((id) => {
                genresMov.forEach((genre) => {
                  genre.id == id && movGenres.push(genre.name);
                });
              });

              return <CardFilm key={mov.id} movData={mov} genres={movGenres} />;
            })}
        </ScrollContainer>
      </div>

      <div className="relative rounded-md">
        <Title2 text="Series" subText="trending" />

        {tvIsLoading && <Loader />}

        <ScrollContainer containerId="tv" btnDark={true}>
          {tvData &&
            tvData.tv.map((tv) => {
              const movGenres = [];

              tv.genre_ids.forEach((id) => {
                genresTv.forEach((genre) => {
                  genre.id == id && movGenres.push(genre.name);
                });
              });

              return <CardTv key={tv.id} tvData={tv} genres={movGenres} />;
            })}
        </ScrollContainer>
      </div>

      <div className="relative rounded-md mt-12">
        <Title2 text="People" subText="trending" />

        {pplIsLoading && <Loader />}

        <ScrollContainer
          containerId="ppl"
          btnDark={true}
          addStyle={"no-scroll-bar"}
        >
          {pplData &&
            pplData.ppl.map((person) => {
              return <CardPpl key={person.id} personData={person} />;
            })}
        </ScrollContainer>
      </div>

      <div className="mb-12">
        <Title2 text="Everyone loves" subText="top 10 rated" />

        <div className="flex flex-wrap mt-8 gap-x-10 gap-y-4">
          {featuredIsLoading && <Loader />}
          {featuredData &&
            featuredData.featured.map((mov) => {
              return <CardFeatured data={mov} />;
            })}
        </div>
      </div>

      <div className="mb-12">
        <Title2 text="What to watch" subText="popular now" />

        <div className="flex flex-wrap mt-8 gap-10">
          {popularIsLoading && <Loader />}
          {popularData &&
            popularData.popular.map((mov) => {
              return <CardPopular data={mov} />;
            })}
        </div>
      </div>

      <div>
        <Title2 text="What to watch" subText="upcoming in theaters" />
      </div>
    </>
  );
}
