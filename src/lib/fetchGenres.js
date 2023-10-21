import axios from "axios";
import { initAxios } from "./axios";

initAxios();

export async function fetchGenresMov() {
  const data = {};
  await axios
    .get("https://api.themoviedb.org/3/genre/movie/list?language=en")
    .then((res) => {
      console.log("genres fetch triggered");
      data.genres = res.data.genres;
    })
    .catch((er) => {
      console.log(er);
    });
  return data;
}

export async function fetchGenresTv() {
  const data = {};
  await axios
    .get("https://api.themoviedb.org/3/genre/tv/list?language=en")
    .then((res) => {
      console.log("genres fetch triggered");
      data.genres = res.data.genres;
    })
    .catch((er) => {
      console.log(er);
    });
  return data;
}