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
            className="text-2xl text-center mt-2 font-extralight w-full px-1 truncate"
            title={personData.name}
          >
            {personData.name}
          </h2>
          <p className="text-center italic mt-2 text-xl font-light text-gray-300">
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
            className="text-4xl font-thin text-center break-words"
            title={personData.name}
          >
            {personData.name}
          </h2>
          <p className="text-lg text-center font-medium mt-5">
            Widely known for
          </p>
          <ul className="text-center">
            {personData.known_for.map((mov) => {
              return (
                <li key={mov.id} className="mt-3">
                  <p className="inline text-lg font-light text-violet-300 text-justify">
                    {mov.title} ({mov.release_date.slice(0, 4)})
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </li>
    </Link>
  );
}
