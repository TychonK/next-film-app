import axios from "axios";
import { initAxios } from "./axios";

initAxios();

export async function fetchGenres() {
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