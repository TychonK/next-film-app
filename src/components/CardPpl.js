import Link from "next/link";

export default function CardPpl(props) {
  const { personData } = props;
  const baseUrlImg = "https://image.tmdb.org/t/p/w500/";

  return (
    <Link href={`/people/${personData.id}`} className="mr-8 last:mr-0">
      <li
        style={{ minWidth: "260px", maxWidth: "260px" }}
        className="card pb-3 relative rounded-md bg-gray-900 text-gray-50"
      >
        <div className="front-content">
          <img
            src={baseUrlImg + personData.profile_path}
            alt="Movie poster"
            className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500"
          />
          <h2
            className="text-2xl text-center pt-2 pb-2 font-thin w-full bg-white bg-opacity-10"
            title={personData.name}
          >
            {personData.name}

            {personData.gender == 1 ? (
              <svg
                fill="currentColor"
                viewBox="0 0 110.72 122.88"
                className="inline w-5 h-5 text-gray-100 ml-2 mb-1"
              >
                <path d="M29.17,74.76c-33.57,0-11.46,2.64-6.9-33.84c6.83-54.56,58.72-54.56,66.37,0c4.91,35.1,25.96,33.84-6.9,33.84 H68.63c-0.05,8.93-1.45,13.5,7.83,18.52c9.25,5.01,34.26,7.59,34.26,20.28v8.13c0,0.65-0.54,1.19-1.19,1.19l-108.41,0 c-0.61,0-1.12-0.5-1.12-1.11v-7.63c0-13.87,23.09-14.12,35.38-21.49c8.15-4.88,6.76-9.79,6.71-17.89L29.17,74.76L29.17,74.76 L29.17,74.76z" />
              </svg>
            ) : (
              <svg
                fill="currentColor"
                viewBox="0 0 122.88 121.42"
                className="inline w-5 h-5 text-gray-100 ml-2 mb-1"
              >
                <path
                  class="st0"
                  d="M0,121.42l0-19.63c10.5-4.67,42.65-13.56,44.16-26.41c0.34-2.9-6.5-13.96-8.07-19.26 c-3.36-5.35-4.56-13.85-0.89-19.5c1.46-2.25,0.84-10.44,0.84-13.53c0-30.77,53.92-30.78,53.92,0c0,3.89-0.9,11.04,1.22,14.1 c3.54,5.12,1.71,14.19-1.27,18.93c-1.91,5.57-9.18,16.11-8.56,19.26c2.31,11.74,32.13,19.63,41.52,23.8l0,22.23L0,121.42L0,121.42z"
                />
              </svg>
            )}
          </h2>
          <p className="text-center italic mt-2 text-xl font-light">
            <span>
              {" "}
              {personData.known_for_department.replace(/ing/g, "or")}{" "}
            </span>
          </p>
        </div>

        <div
          className="back-content absolute top-0 bottom-0 left-0 right-0 p-4 overflow-y-scroll rounded-md"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${
              baseUrlImg + personData.profile_path
            })`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h2
            className="text-3xl font-thin text-center"
            title={personData.name}
          >
            {personData.name}
          </h2>
          <span className="block text-center font-light tracki text-white-400 mt-2">
            Sex - {personData.gender == 2 ? "male" : "female"}
          </span>
          <p className="text-lg font-semibold mt-2">Known for</p>
          <ul className="mt-2 capitalize list-disc list-inside">
            {personData.known_for.map((mov) => {
              return (
                <Link href={`/films/${mov.id}`}>
                  <li className="mt-2">
                    {mov.media_type + " "}
                    <p className="underline inline">"{mov.title}"</p>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </li>
    </Link>
  );
}
