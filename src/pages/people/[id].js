import axios from "axios";
import useSWR from "swr";
import { useRouter } from "next/router";

import Loader from "@/components/loader";
import GoBackBtn from "@/components/goBackBtn";
import SimilarMovies from "@/components/SimilarMovies";
import NotFound from "@/components/notFound";

import { initAxios } from "@/lib/axios";
import { calculateAge } from "@/lib/helpers";

initAxios();

const baseUrlBig = "https://image.tmdb.org/t/p/original/";
const baseUrlSmall = "https://image.tmdb.org/t/p/w500/";

export default function PersonDetailsPage() {
    const router = useRouter();
    const { id } = router.query;

    const requestUrl =
      `https://api.themoviedb.org/3/person/${id}?append_to_response=images%2Ccombined_credits&language=en-US`;

    const { data, error, isLoading } = useSWR(requestUrl, fetchPersonData);
    
    const {
      data: allGenres,
      error: genresError,
      isLoading: genresLoading,
    } = useSWR(`https://api.themoviedb.org/3/genre/movie/list`, fetchGenres);

    async function fetchPersonData(url) {
      let data;
      await axios
        .get(url)
        .then(function (res) {
          data = res.data;
        })
        .catch((er) => {
          console.log(er);
        });
      return data;
    } 
  
    async function fetchGenres(url) {
      let data;
      await axios
        .get(url)
        .then(function (res) {
          data = res.data.genres;
        })
        .catch((er) => {
          console.log(er);
        });
      return data;
    }
    
    if (isLoading) {
      return <Loader />;
    }

    if (error || !data) {
      return <NotFound />;
    }

  return (
    <div className="text-white px-4 md:px-32">
      <GoBackBtn />

      <div
        className="relative flex items-end justify-start w-full text-left bg-center bg-cover cursor-pointer h-96 md:col-span-2 lg:row-span-2 lg:h-full group dark:bg-gray-500"
        style={{
          backgroundImage: `linear-gradient(rgba(236, 72, 184, 0.3), rgba(236, 72, 184, 0.5)), url(${
            baseUrlBig + data.images.profiles[0].file_path
          })`,
        }}
      >
        <h2 className="font-medium text-md group-hover:underline lg:text-2xl lg:font-semibold text-gray-100 p-5">
            Visit the gallery
        </h2>
      </div>

      <h1 className="text-4xl font-extralight">{data.name}</h1>
      <p className="text-2xl">Person ID: {id}</p>
      <p className="text-2xl">
        Age: {calculateAge(data.birthday)}{" "}
        <span className="italic">({data.birthday})</span>
      </p>
      <p className="text-2xl">Place of birth: {data.place_of_birth}</p>
      <div>
        <p className="text-xl font-semibold">Bio:</p>
        <p>{data.biography}</p>
      </div>
      <div className="scroll-container flex flex-row overflow-x-scroll space-x-4 my-8">
        {data.images.profiles.map((profile) => (
          <img
            src={baseUrlBig + profile.file_path}
            alt="person img"
            className="w-64"
            key={profile.file_path}
          />
        ))}
      </div>
      <SimilarMovies
        data={data.combined_credits.cast}
        title="Participated in"
      />
    </div>
  );
}
