export default function Card(props) {
    const {movData, genres} = props
    const baseUrlImg = "https://image.tmdb.org/t/p/w500/";
    return (
      <li className="mt-8 w-64 p-6 rounded-md shadow-md bg-gray-900 text-gray-50">
        <img
          src={baseUrlImg + movData.poster_path}
          alt="Movie poster"
          className="object-cover object-center w-full rounded-md h-72 bg-gray-500"
        />
        <div className="mt-6 mb-2">
          <span className="block text-xs font-medium tracki uppercase text-violet-400">
            {movData.release_date}
          </span>
          <h2 className="text-xl font-semibold tracki">{movData.title}</h2>
          <div className="flex items-center text-xs">
            <span>{genres.join(", ")}</span>
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
          <div>
            <p className="text-justify overflow-hidden">{movData.overview}</p>
          </div>
        </div>
      </li>
    );
}