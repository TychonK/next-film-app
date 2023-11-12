import React from "react";
import axios from "axios";
import useSWR from "swr";

import ScrollContainer from "@/components/ScrollContainer";
import Loader from "@/components/loader";
import Placeholder from "@/components/placehoder";
import Title2 from "@/components/Title2";
import CardMov from "@/components/CardMovie";
import CardTv from "@/components/CardTv";
import CardPpl from "@/components/CardPpl";
import CardFeatured from "@/components/CardFeatured";
import CardPopular from "@/components/CardPopular";
import Carousel from "@/components/Carousel";

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
    )
  
   const {
     data: upcomingData,
     error: upcomingErr,
     isLoading: upcomingIsLoading,
   } = useSWR(
     "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
     fetchUpcomingData
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
      })
      .catch((er) => {
        console.log(er);
      });
    return dataObj;
  }

  async function fetchUpcomingData(url) {
    const dataObj = {};

    await axios
      .get(url)
      .then(function (res) {
        dataObj.upcoming = res.data.results.slice(0, 7);
      })
      .catch((er) => {
        console.log(er);
      });
    return dataObj;
  }

  return (
    <>
      <div className="mb-12">
        <Title2 text="What to watch" subText="upcoming in theaters" />
        {upcomingIsLoading && (
          <Placeholder className="mt-8 mx-4 md:mx-20 min-h-default" />
        )}
        {upcomingData && <Carousel data={upcomingData.upcoming} />}
      </div>

      <div className="relative rounded-md">
        <Title2 text="Movies" subText="trending" />
        <ScrollContainer containerId="movie" btnDark={true}>
          {filmIsLoading &&
            Array.from({ length: 20 }).map((_, index) => (
              <Placeholder
                key={index}
                className="mr-8 last:mr-0 min-w-4xs max-w-4xs"
              />
            ))}
          {filmData &&
            filmData.films.map((mov) => {
              const movGenres = [];

              mov.genre_ids.forEach((id) => {
                genresMov.forEach((genre) => {
                  genre.id == id && movGenres.push(genre.name);
                });
              });

              return <CardMov key={mov.id} movData={mov} genres={movGenres} />;
            })}
        </ScrollContainer>
      </div>

      <div className="relative rounded-md">
        <Title2 text="Series" subText="trending" />
        <ScrollContainer containerId="tv" btnDark={true}>
          {tvIsLoading &&
            Array.from({ length: 20 }).map((_, index) => (
              <Placeholder key={index} className="min-w-4xs max-w-4xs" />
            ))}
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
        <ScrollContainer
          containerId="ppl"
          btnDark={true}
          addStyle={"no-scroll-bar"}
        >
          {pplIsLoading &&
            Array.from({ length: 20 }).map((_, index) => (
              <Placeholder key={index} className="min-w-4xs max-w-4xs" />
            ))}
          {pplData &&
            pplData.ppl.map((person) => {
              return <CardPpl key={person.id} personData={person} />;
            })}
        </ScrollContainer>
      </div>

      <div className="mb-12">
        <Title2
          text="Everyone loves"
          subText="top 10 rated"
          className="text-center"
        />

        <div className="flex flex-wrap mt-8 mx-20 gap-12 justify-around">
          {featuredIsLoading && <Loader />}
          {featuredData &&
            featuredData.featured.map((mov, index) => {
              return <CardFeatured data={mov} index={index} />;
            })}
        </div>
      </div>

      <div className="mb-12">
        <Title2
          text="What to watch"
          subText="popular now"
          className="text-center"
        />

        <div className="flex flex-wrap justify-around mt-8 gap-16 mx-20">
          {popularIsLoading && <Loader />}
          {popularData &&
            popularData.popular.slice(0, 15).map((mov) => {
              return <CardPopular data={mov} />;
            })}
        </div>
      </div>
    </>
  );
}
