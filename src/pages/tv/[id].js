import axios from "axios";
import useSWR from "swr";
import { useRouter } from "next/router";

import Loader from "@/components/loader";
import GoBackBtn from "@/components/goBackBtn";
import SimilarMovies from "@/components/SimilarMovies";
import Cast from "@/components/Cast";
import Crew from "@/components/Crew";
import ScrollContainer from "@/components/ScrollContainer";
import NotFound from "@/components/notFound";
import FavoriteBtn from "@/components/FavoriteBtn";

import { initAxios } from "@/lib/axios";
import { formatTime } from "@/lib/helpers";

initAxios();

const baseUrlBackdrop = "https://image.tmdb.org/t/p/original/";
const baseUrlPerson = "https://image.tmdb.org/t/p/w500/";

export default function TvDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/tv/${id}?append_to_response=similar%2Ccredits%2Cvideos&language=en-US`,
    fetchTvData
  );

  async function fetchTvData(url) {
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

  const keysToExclude = ["credits", "similar", "videos"];
  const filteredObject = { ...data };
  keysToExclude.forEach((key) => {
    delete filteredObject[key];
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!data || error) {
    return <NotFound />;
  }

  return (
    <div className="text-white">
      <div className="lg:px-32">
        <div className="flex justify-between">
          <GoBackBtn />
          <FavoriteBtn entity={filteredObject} type="tv" />
        </div>
        <div className="flex flex-col xl:flex-row mt-4 md:mt-10 bg-gray-950 rounded-md shadow-lg">
          <div className="w-full h-max-full xl:w-1/2">
            <div
              className="hidden xl:block w-full h-full rounded-lg shadow-lg bg-cover bg-center"
              style={{
                backgroundImage: `url(${
                  data.poster_path
                    ? baseUrlBackdrop + data.poster_path
                    : "/no-image.svg"
                })`,
              }}
            ></div>
            <img
              src={
                data.poster_path
                  ? baseUrlBackdrop + data.poster_path
                  : "/no-image.svg"
              }
              alt="Movie poster"
              className="block xl:hidden w-full rounded-lg shadow-lg bg-cover bg-center"
            />
          </div>

          <div className="w-full p-4 md:py-8 md:px-12 xl:w-1/2">
            <h1 className="text-xl md:text-4xl font-semibold md:mb-4">
              {data.name}
              <span className="font-thin"> ({data.original_name})</span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg mb-4 md:mb-8">
              {data.tagline || "No tagline available"}
            </p>
            <div className="mb-4 md:mb-8 text-base md:text-lg">
              <p className="text-lg">
                Genres: {data.genres.length != 0 ? data.genres.map((genre) => genre.name).join(", ") : "nodata" }
              </p>
              <p>Original language: {data.original_language.length != 0 ? data.original_language.toUpperCase() : "nodata" }</p>
              <p>
                Show origin:{" "}
                {data.production_countries.length == 0 ? "no data" : data.production_countries
                  .map((country) => country.name)
                  .join(", ")}
              </p>
              <p>
                Episode run time:{" "}
                {data.episode_run_time.length != 0
                  ? formatTime(data.episode_run_time)
                  : "No data"}
              </p>
              <p>Show ID: {id}</p>
            </div>

            <div className="mb-4 md:mb-8 text-base md:text-lg">
              <p>
                Episodes:{" "}
                {data.number_of_episodes !== 0
                  ? data.number_of_episodes
                  : "No data"}
              </p>
              <p>
                Seasons:{" "}
                {data.number_of_seasons !== 0
                  ? data.number_of_seasons
                  : "No data"}
              </p>
              <p>
                User's score: {data.vote_average.length != 0 ? data.vote_average.toFixed(1) : "no data"} (vote count{" "}
                {data.vote_count || 0})
              </p>
              <p>First air: {data.first_air_date.length != 0 ? data.first_air_date : "no data"}</p>
            </div>
            <div className="mb-4 md:mb-8">
              <h2 className="text-2xl font-semibold md:mb-4">Overview</h2>
              <p className="text-base md:text-lg">{data.overview.length != 0 ? data.overview : "no data"}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold">Production Companies</h2>

              <div className="flex flex-row flex-wrap gap-3 md:gap-8 mt-4">
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

              {data.videos.results.length != 0 && (
                <iframe
                  height="315"
                  src={`https://www.youtube.com/embed/${
                    data.videos.results.find((video) => {
                      return video.type == "Trailer" || video;
                    }).key
                  }`}
                  title="trailer"
                  allowFullScreen
                  className="rounded-md mt-8 w-full"
                ></iframe>
              )}
            </div>
          </div>
        </div>
      </div> 

      <div className="mb-8">
        <h2 className="text-5xl md:text-7xl text-center font-semibold mt-8 md:mt-16 relative pseudo-title">
          Cast
        </h2>
        {data.credits.cast.length != 0 ? (
          <ScrollContainer containerId="cast">
            {data.credits.cast.length != 0 && (
              <Cast castData={data.credits.cast} />
            )}
          </ScrollContainer>
        ) : (
          <NotFound />
        )}

        <h2 className="text-5xl md:text-7xl text-center font-semibold mt-8 md:mt-16 relative pseudo-title">
          Crew
        </h2>
        <div className="relative">
          {data.credits.crew.length != 0 ? (
            <ScrollContainer containerId="crew">
              <Crew crewData={data.credits.crew} />
            </ScrollContainer>
          ) : (
            <NotFound />
          )}
        </div>
      </div>

      <SimilarMovies data={data.similar.results} title="Related" type="tv" />
    </div>
  );
}
