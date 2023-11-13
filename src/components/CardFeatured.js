import Link from "next/link";
import { calculateBackgroundColor } from "@/lib/helpers";

const baseUrlImg = "https://image.tmdb.org/t/p/w500/";

export default function CardFeatured({ data, index }) {
    return (
      <Link href={`/movie/${data.id}`} className="sm:max-w-lg group">
        <div
          className="bg-white shadow-lg border-gray-100 border rounded-lg overflow-hidden sm:rounded-3xl md:p-4 flex space-x-2 md:space-x-8 relative"
          key={data.id}
        >
         
            <img
              className="w-1/2 sm:rounded-3xl shadow-lg"
              src={baseUrlImg + data.poster_path}
              alt="Movie poster"
            />
        
          <div className="flex flex-col w-1/2 space-y-2 md:space-y-4 relative z-10">
            <div className="flex justify-between items-start">
              <h2 className="text-lg md:text-2xl font-bold">{data.title}</h2>
              <div
                className="font-bold rounded-xl mt-1 mr-1 md:mt-0 md:mr-0 p-1.5 md:p-2"
                style={{
                  backgroundColor: calculateBackgroundColor(data.vote_average),
                }}
              >
                {data.vote_average.toFixed(1)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Released:</div>
              <div className="text-base md:text-lg text-gray-800">
                {data.release_date.slice(0, 4)}
              </div>
            </div>
            <p className="text-gray-400 line-clamp-3">{data.overview}</p>
            <div className="flex text-base md:text-xl font-bold group-hover:underline">
              More
            </div>
          </div>
          <div className="absolute z-2 right-0 bottom-0 leading-none text-bold text-blue-200 opacity-20 text-xxl">
            {index + 1}
          </div>
        </div>
      </Link>
    );
}