import Link from "next/link";

import { calculateBackgroundColor } from "@/lib/helpers";

const baseUrlImg = "https://image.tmdb.org/t/p/w500/";

export default function CardPopular({ data }) {
    return (
      <Link
        href={`/movie/${data.id}`}
        className="relative block w-card/sm md:w-card bg-white shadow-lg rounded-lg overflow-hidden group"
      >
        <div className="relative overflow-hidden" key={data.id}>
          <div className="bg-gradient-to-t from-black via-gray-800 to-transparent absolute inset-0"></div>
          <img
            src={baseUrlImg + data.poster_path}
            alt="Film Poster"
            className="w-full md:h-80 object-cover object-top transform group-hover:scale-105 transition-transform"
          />
        </div>
        <div className="p-2 pb-8 md:p-4 md:pb-10">
          <div className="flex justify-between items-start">
            <h2
              className="text-lg md:text-2xl font-bold text-gray-800 line-clamp-2 break-words"
              title={data.title}
            >
              {data.title}
            </h2>
            <div
              className="font-bold rounded-xl p-1.5 md:p-2"
              style={{
                backgroundColor: calculateBackgroundColor(data.vote_average),
              }}
            >
              {data.vote_average.toFixed(1)}
            </div>
          </div>
          <p className="text-gray-600 text-sm mt-2">
            Release: {data.release_date.slice(0, 4)}
          </p>
          <p className="text-gray-600 text-sm">Popularity: {data.popularity}</p>
          <p className="text-gray-600 text-sm mt-3 line-clamp-4">
            {data.overview}
          </p>

          <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm text-center font-semibold text-cyan-600 group-hover:underline group-hover:text-cyan-900">
            more
          </p>
        </div>
      </Link>
    );
}