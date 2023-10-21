import axios from "axios";
import useSWR from "swr";
import { useRouter } from "next/router";
import Link from "next/link";

import Loader from "@/components/loader";
import GoBackBtn from "@/components/goBackBtn";
import numeral from "numeral";
import SimilarMovies from "@/components/SimilarMovies";

import { initAxios } from "@/lib/axios";

initAxios();

const baseUrlBackdrop = "https://image.tmdb.org/t/p/original/";
const baseUrlPerson = "https://image.tmdb.org/t/p/w500/";


export async function getServerSideProps(context) {
  const { id } = context.query;

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );

    return {
      props: {
        data: response.data,
      },
    };
  } catch (error) {
    return {
      props: {
        error: "An error occurred while fetching the data.",
      },
    };
  }
}

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
      <div className="bg-gray-900 text-white py-6 px-4 md:px-12">
        {isLoading && <Loader />}
        {data && (
          <div className="max-w-5xl mx-auto">
            <GoBackBtn />

            <h1 className="text-4xl font-semibold mb-4">
              {data.original_title}
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              {data.tagline || "No tagline available"}
            </p>

            <div className="flex flex-wrap gap-8 items-center">
              <div className="w-full md:w-1/2">
                <img
                  src={baseUrlBackdrop + data.poster_path}
                  alt="Movie poster"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>

              <div className="w-full md:w-1/2">
                <div className="mb-8">
                  <p className="text-lg">
                    Genres: {data.genres.map((genre) => genre.name).join(", ")}
                  </p>
                  <p className="text-lg">
                    Original language: {data.original_language}
                  </p>
                  <p className="text-lg">
                    Origin country:{" "}
                    {data.production_countries
                      .map((country) => country.name)
                      .join(", ")}
                  </p>
                  <p className="text-lg">Lasts: {formatTime(data.runtime)}</p>
                  <p className="text-lg">Film ID: {id}</p>
                </div>

                <div className="mb-8">
                  <p className="text-lg">
                    Budget: {numeral(data.budget).format("$ 0,0[.]00")}
                  </p>
                  <p className="text-lg">
                    Revenue:{" "}
                    {data.revenue !== 0
                      ? numeral(data.revenue).format("$ 0,0[.]00")
                      : "No data"}
                  </p>
                  <p className="text-lg">
                    User's score: {data.vote_average} (Vote count:{" "}
                    {data.vote_count})
                  </p>
                  <p className="text-lg">Release date: {data.release_date}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <p className="text-lg">{data.overview}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Production Companies
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.production_companies.map((company) => (
                  <div key={company.id}>
                    <div className="flex items-center">
                      <img
                        src={
                          company.logo_path
                            ? baseUrlPerson + company.logo_path
                            : "/favicon.ico"
                        }
                        alt="Company logo"
                        className="w-12 h-12 rounded-lg"
                      />
                      <p className="text-lg ml-2">{company.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Cast</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {castData &&
                  castData.cast.map((person) => (
                    <li
                      key={person.id}
                      className="bg-gray-800 rounded-lg hover:shadow-md transition-transform transform hover:scale-105"
                    >
                      <Link href={`/people/${person.id}`}>
                        <img
                          src={
                            person.profile_path
                              ? baseUrlPerson + person.profile_path
                              : "/male-icon.svg"
                          }
                          alt={person.name}
                          className="w-full h-60 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                          <p className="text-xl font-semibold">{person.name}</p>
                          <p className="text-lg">{person.character}</p>
                          <p className="text-lg">
                            {person.known_for_department.replace(/ing/g, "or")}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}
        <SimilarMovies similarData={similarData} />
      </div>
    );
};
