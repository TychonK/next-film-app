import axios from "axios";
import useSWR from "swr";
import { useRouter } from "next/router";

import Loader from "@/components/loader";
import GoBackBtn from "@/components/goBackBtn";
import numeral from "numeral";
import SimilarMovies from "@/components/SimilarMovies";
import Cast from "@/components/Cast";
import Crew from "@/components/Crew";

import { initAxios } from "@/lib/axios";
import NotFound from "@/components/notFound";

initAxios();

const baseUrlBackdrop = "https://image.tmdb.org/t/p/original/";
const baseUrlPerson = "https://image.tmdb.org/t/p/w500/";


// export async function getServerSideProps(context) {
//   const { id } = context.query;

//   try {
//     const response = await axios.get(
//       `https://api.themoviedb.org/3/movie/${id}?language=en-US`
//     );

//     return {
//       props: {
//         data: response.data,
//       },
//     };
//   } catch (error) {
//     return {
//       props: {
//         error: "An error occurred while fetching the data.",
//       },
//     };
//   }
// }

export default function FilmDetailPage() {
  const router = useRouter();
  const { id } = router.query;
    
    const { data, error, isLoading } = useSWR(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      fetchFilmData
    );

    const {
      data: castData,
      error: castError,
      isLoading: castLoading,
    } = useSWR(
      `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
      fetchCastData
        );
    
    const {
      data: similarData,
      error: similarError,
      isLoading: similarLoading,
    } = useSWR(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
      fetchSimilarData
    );

    async function fetchFilmData(url) {
        let data
      await axios
        .get(url)
        .then(function (res) {
            data = res.data;
        })
        .catch((er) => {
          console.log(er);
        });
        return data
    }

    async function fetchCastData(url) {
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

    async function fetchSimilarData(url) {
      let data;
      await axios
        .get(url)
        .then(function (res) {
          data = res.data.results;
        })
        .catch((er) => {
          console.log(er);
        });
      return data;
    }
    
    function formatTime(minutes) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;

      let formattedTime = "";

      if (hours > 0) {
        formattedTime += `${hours} hour${hours > 1 ? "s" : ""}`;
      }

      if (remainingMinutes > 0) {
        if (hours > 0) {
          formattedTime += " ";
        }
        formattedTime += `${remainingMinutes} minute${
          remainingMinutes > 1 ? "s" : ""
        }`;
      }

      return formattedTime;
  }

    return (
      <div className="text-white px-4 md:px-32">
        {isLoading && <Loader />}
        {data && (
          <>
            <GoBackBtn />

            <div className="flex flex-col lg:flex-row gap-8 mt-10">
              <div className="w-full h-max-full md:w-1/2">
                <img
                  src={
                    data.poster_path
                      ? baseUrlBackdrop + data.poster_path
                      : "/no-image.svg"
                  }
                  alt="Movie poster"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>

              <div className="w-full md:w-1/2">
                <h1 className="text-4xl font-semibold mb-4">
                  {data.title}
                  <span className="font-thin"> ({data.original_title})</span>
                </h1>
                <p className="text-gray-400 text-lg mb-8">
                  {data.tagline || "No tagline available"}
                </p>
                <div className="mb-8">
                  <p className="text-lg">
                    Genres: {data.genres.map((genre) => genre.name).join(", ")}
                  </p>
                  <p className="text-lg">
                    Original language: {data.original_language.toUpperCase()}
                  </p>
                  <p className="text-lg">
                    Film origin:{" "}
                    {data.production_countries
                      .map((country) => country.name)
                      .join(", ")}
                  </p>
                  <p className="text-lg">Lasts: {formatTime(data.runtime)}</p>
                  <p className="text-lg">Film ID: {id}</p>
                </div>

                <div className="mb-8">
                  <p className="text-lg">
                    Budget:{" "}
                    {data.budget !== 0
                      ? numeral(data.budget).format("$ 0,0[.]00")
                      : "No data"}
                  </p>
                  <p className="text-lg">
                    Revenue:{" "}
                    {data.revenue !== 0
                      ? numeral(data.revenue).format("$ 0,0[.]00")
                      : "No data"}
                  </p>
                  <p className="text-lg">
                    User's score: {data.vote_average.toFixed(1)} (vote count{" "}
                    {data.vote_count})
                  </p>
                  <p className="text-lg">Release date: {data.release_date}</p>
                </div>
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                  <p className="text-lg">{data.overview}</p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">
                    Production Companies
                  </h2>
                  <div className="flex flex-row flex-wrap gap-8">
                    {data.production_companies.length == 0 ? (
                      <NotFound />
                    ) : (
                      data.production_companies.map((company) => (
                        <div key={company.id}>
                          <div className="flex items-center">
                            <img
                              src={
                                company.logo_path
                                  ? baseUrlPerson + company.logo_path
                                  : "/favicon.ico"
                              }
                              alt="Company logo"
                              className="h-6 p-1 rounded-sm bg-white"
                            />
                            <p className="text-lg ml-2">{company.name}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-7xl font-semibold mt-16">Cast</h2>
              <ul className="flex flex-row gap-x-12 mt-8 pb-3 px-2 overflow-x-scroll overflow-y-hidden scroll-container rounded-md">
                {castData && <Cast castData={castData} />}
              </ul>
              <h2 className="text-7xl font-semibold mt-16">Crew</h2>
              <ul className="flex flex-row gap-x-12 mt-8 pb-3 px-2 overflow-x-scroll overflow-y-hidden scroll-container rounded-md">
                {castData && <Crew castData={castData} />}
              </ul>
            </div>
          </>
        )}
        <SimilarMovies data={similarData} title="Recommended"/>
      </div>
    );
};
