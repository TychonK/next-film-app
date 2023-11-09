import Link from "next/link";

const baseUrlImg = "https://image.tmdb.org/t/p/w500/";

export default function CardFeatured({ data }) {
    return (
      <Link
        href={`/movie/${data.id}`}
        class="sm:max-w-lg mb-20 group"
      >
        <div class="bg-white shadow-lg border-gray-100 border sm:rounded-3xl p-4 flex space-x-8 h-full">
          <div class="h-32 overflow-visible w-1/2">
            <img
              class="rounded-3xl shadow-lg"
              src={baseUrlImg + data.poster_path}
              alt="Movie poster"
            />
          </div>
          <div class="flex flex-col w-1/2 space-y-4">
            <div class="flex justify-between items-start">
              <h2 class="text-2xl font-bold">{data.title}</h2>
              <div class="bg-yellow-400 font-bold rounded-xl p-2">
                {data.vote_average.toFixed(1)}
              </div>
            </div>
            <div>
              <div class="text-sm text-gray-400">Released:</div>
              <div class="text-lg text-gray-800">
                {data.release_date.slice(0, 4)}
              </div>
            </div>
            <p class="text-gray-400 line-clamp-3">{data.overview}</p>
            <div class="flex text-xl font-bold group-hover:underline">More</div>
          </div>
        </div>
      </Link>
    );
}