import Link from "next/link";
import { calculateAge } from "@/lib/helpers";

const baseUrlImg = "https://image.tmdb.org/t/p/w500/";

const MovieCard = ({ data, type, toggleFavorite }) => (
  <div
    key={data.id}
    className="flex max-w-sm bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 hover:shadow-2xl ease-in-out duration-500"
  >
      <div className="overflow-hidden rounded-xl relative shadow-lg text-white">
        <div className="absolute inset-0 z-2 transition duration-300 ease-in-out bg-gradient-to-t from-black via-gray-900 to-transparent"></div>
            <Link
                href={`movie/${data.id}`}
                className="relative block cursor-pointer group z-2 px-4 pt-4 md:px-10 md:pt-10 space-y-6">
          <div className="poster__info align-self-end w-full">
            <div className="h-32"></div>
            <div className="space-y-6 detail_info">
              <div className="flex flex-col space-y-2 inner">
                <h3
                  className="text-2xl font-bold text-white"
                >
                  {data.title}
                </h3>
                <div className="mb-0 text-lg text-gray-400">{data.tagline}</div>
              </div>
              <div className="flex flex-row justify-between datos">
                <div className="flex flex-col datos_col">
                  <div className="popularity">{data.popularity}</div>
                  <div className="text-sm text-gray-400">Popularity:</div>
                </div>
                <div className="flex flex-col datos_col">
                  <div className="release">{data.release_date}</div>
                  <div className="text-sm text-gray-400">Release date:</div>
                </div>
                <div className="flex flex-col datos_col">
                  <div className="release">{data.runtime} min</div>
                  <div className="text-sm text-gray-400">Runtime:</div>
                </div>
              </div>
              <div className="flex flex-col overview">
                <div className="flex flex-col"></div>
                <div className="text-xs text-gray-400 mb-2">Overview:</div>
                <p className="text-xs text-gray-100 mb-6 line-clamp-6">
                  {data.overview}
                </p>
              </div>
            </div>
            <div
              data-countdown="2021-09-15"
              className="absolute inset-x-0 top-0 pt-5 w-full mx-auto text-2xl uppercase text-center drop-shadow-sm font-bold text-white"
            >
              {type}
            </div>
          </div>
        </Link>
        <img
          className="absolute inset-0 transform w-full -translate-y-4"
          src={baseUrlImg + data.poster_path}
          style={{ filter: "grayscale(0)" }}
        />
        <div className="flex flex-row relative pb-10 space-x-4 z-2">
          <button
            className="flex items-center py-2 px-4 rounded-full mx-auto text-white bg-red-500 hover:bg-red-700 hover:cursor-pointer"
            onClick={() => toggleFavorite(data.id, type)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <div className="text-sm text-white ml-2">Remove from Favorites</div>
          </button>
        </div>
      </div>
    </div>
);

const TvCard = ({ data, type, toggleFavorite }) => (
  <div
    key={data.id}
    className="flex max-w-sm bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 hover:shadow-2xl ease-in-out duration-500"
  >
    <div className="overflow-hidden rounded-xl relative shadow-lg text-white">
      <div className="absolute inset-0 z-2 transition duration-300 ease-in-out bg-gradient-to-t from-black via-gray-900 to-transparent"></div>
      <Link
        href={`tv/${data.id}`}
        className="relative block cursor-pointer group z-2 px-4 pt-4 md:px-10 md:pt-10 space-y-6"
      >
        <div className="poster__info align-self-end w-full">
          <div className="h-32"></div>
          <div className="space-y-6 detail_info">
            <div className="flex flex-col space-y-2 inner">
              <h3 className="text-2xl font-bold text-white">{data.name}</h3>
              <div className="mb-0 text-lg text-gray-400">{data.tagline}</div>
            </div>
            <div className="flex flex-row justify-between datos">
              <div className="flex flex-col datos_col">
                <div className="popularity">{data.popularity}</div>
                <div className="text-sm text-gray-400">Popularity:</div>
              </div>
              <div className="flex flex-col datos_col">
                <div className="release">{data.first_air_date}</div>
                <div className="text-sm text-gray-400">First air date:</div>
              </div>
              <div className="flex flex-col datos_col">
                <div className="release">
                  {data.episode_run_time.length == 0
                    ? "Standard"
                    : data.episode_run_time + "min"}
                </div>
                <div className="text-sm text-gray-400">Runtime:</div>
              </div>
            </div>
            <div className="flex flex-col overview">
              <div className="flex flex-col"></div>
              <div className="text-xs text-gray-400 mb-2">Overview:</div>
              <p className="text-xs text-gray-100 mb-6 line-clamp-6">
                {data.overview}
              </p>
            </div>
          </div>
          <div
            data-countdown="2021-09-15"
            className="absolute inset-x-0 top-0 pt-5 w-full mx-auto text-2xl uppercase text-center drop-shadow-sm font-bold text-white"
          >
            {type}
          </div>
        </div>
      </Link>
      <img
        className="absolute inset-0 transform w-full -translate-y-4"
        src={baseUrlImg + data.poster_path}
        style={{ filter: "grayscale(0)" }}
      />
      <div className="flex flex-row relative pb-10 space-x-4 z-2">
        <button
          className="flex items-center py-2 px-4 rounded-full mx-auto text-white bg-red-500 hover:bg-red-700 hover:cursor-pointer"
          onClick={() => toggleFavorite(data.id, type)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          <div className="text-sm text-white ml-2">Remove from Favorites</div>
        </button>
      </div>
    </div>
  </div>
);

const PplCard = ({ data, type, toggleFavorite }) => (
  <div
    key={data.id}
    className="flex w-max-w-sm bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 hover:shadow-2xl ease-in-out duration-500"
  >
    <div className="overflow-hidden rounded-xl relative shadow-lg text-white">
      <div className="absolute inset-0 z-2 transition duration-300 ease-in-out bg-gradient-to-t from-black via-gray-900 to-transparent"></div>
      <Link
        href={`people/${data.id}`}
        className="relative block cursor-pointer group z-2 px-4 pt-4 md:px-10 md:pt-10 space-y-6"
      >
        <div className="poster__info align-self-end w-full">
          <div className="h-32"></div>
          <div className="space-y-6 detail_info">
            <div className="flex flex-col space-y-2 inner">
              <h3 className="text-2xl font-bold text-white">{data.name}</h3>
              <div className="mb-0 text-lg text-gray-400">
                {data.known_for_department}
              </div>
            </div>
            <div className="flex flex-row justify-left gap-8 datos">
              <div className="flex flex-col datos_col">
                <div className="popularity">{data.popularity}</div>
                <div className="text-sm text-gray-400">Popularity:</div>
              </div>
              <div className="flex flex-col datos_col">
                <div className="release">{calculateAge(data.birthday)}</div>
                <div className="text-sm text-gray-400">Age:</div>
              </div>
            </div>
            <div className="flex flex-col overview">
              <div className="flex flex-col"></div>
              <div className="text-xs text-gray-400 mb-2">Biography:</div>
              <p className="text-xs text-gray-100 mb-6 line-clamp-6">
                {data.biography}
              </p>
            </div>
          </div>
          <div
            data-countdown="2021-09-15"
            className="absolute inset-x-0 top-0 pt-5 w-full mx-auto text-2xl uppercase text-center drop-shadow-sm font-bold text-white"
          >
            {type}
          </div>
        </div>
      </Link>
      <img
        className="absolute inset-0 transform w-full -translate-y-20"
        src={baseUrlImg + data.profile_path}
        style={{ filter: "grayscale(0)" }}
      />
      <div className="flex flex-row relative pb-10 space-x-4 z-2">
        <button
          className="flex items-center py-2 px-4 rounded-full mx-auto text-white bg-red-500 hover:bg-red-700 hover:cursor-pointer"
          onClick={() => toggleFavorite(data.id, type)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          <div className="text-sm text-white ml-2">Remove from Favorites</div>
        </button>
      </div>
    </div>
  </div>
);


export { MovieCard, TvCard, PplCard };