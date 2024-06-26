import Link from "next/link";

export default function CardMov(props) {
  const {movData, genres} = props
  const baseUrlImg = "https://image.tmdb.org/t/p/w500/";
  const baseUrlBackdrop = "https://image.tmdb.org/t/p/w780/";
  
  return (
    <Link href={`/movie/${movData.id}`} className="card-container">
      <li className="card w-card/sm md:w-card relative p-2 md:p-6 rounded-md shadow-lg bg-gray-900 text-gray-50">
        <div className="front-content">
          <img
            src={
              !movData.poster_path
                ? "film.svg"
                : baseUrlImg + movData.poster_path
            }
            alt="Movie poster"
            className={`${
              !movData.poster_path ? "object-contain" : "object-cover"
            } object-center w-full rounded-md h-72 bg-gray-950`}
          />
          <div className="mt-4">
            <span className="block text-xs font-medium tracki uppercase text-violet-400">
              {movData.release_date || "no data"}
            </span>
            <h2
              className="text-xl font-semibold truncate"
              title={movData.title}
            >
              {movData.title}
            </h2>
            <div className="flex items-center text-xs">
              <span className="line-clamp-1">{genres.length > 0 ? genres.join(", ") : "No genres data"}</span>
            </div>
            <div className="flex items-center space-x-2 text-yellow-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-5 h-5 fill-current"
              >
                <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
              </svg>
              <span className="text-xl font-bold">
                {movData.vote_average.toFixed(1)}
              </span>
              <span className="">
                {"("}
                {movData.vote_count}
                {")"}
              </span>
            </div>
            <div className="hidden h-28 md:block">
              <p className="max-h-full text-justify fading-text overflow-hidden">
                {movData.overview}
              </p>
            </div>
          </div>

          <p className="hidden md:block text-2xl font-semibold m-0 text-center align-top">
            ...
          </p>
        </div>

        <div
          className="hidden md:block back-content absolute top-0 bottom-0 left-0 right-0 p-4 overflow-y-scroll rounded-md"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${
              baseUrlBackdrop + movData.backdrop_path
            })`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h2 className="text-3xl font-thin text-center" title={movData.title}>
            {movData.title}
          </h2>
          <span className="block text-center font-light italic mt-2">
            {genres.join(", ")}
          </span>
          <span className="block text-center font-normal tracki uppercase text-white-400 mt-2">
            release date: <br /> {movData.release_date}
          </span>
          <div className="flex flex-col items-center text-yellow-500 mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-10 h-10 fill-current"
            >
              <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
            </svg>
            <span className="text-xl font-bold mt-2">
              {movData.vote_average.toFixed(1)}
            </span>
            <span>
              {"("}
              {movData.vote_count}
              {")"}
            </span>
          </div>
          <p className="text-center mt-2">{movData.overview}</p>
        </div>
      </li>
    </Link>
  );
}