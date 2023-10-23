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
            className="text-2xl text-center mt-2 font-extralight w-full"
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
            className="text-4xl font-thin text-center"
            title={personData.name}
          >
            {personData.name}
          </h2>
          <p className="text-2xl text-center font-light mt-3">Widely known for</p>
          <ul className="mt-2 list-disc list-inside text-center">
            {personData.known_for.map((mov) => {
              return (
                <Link href={`/films/${mov.id}`}>
                  <li className="mt-4">
                    <p className="underline inline text-xl font-light text-justify">{mov.title} ({ mov.release_date.slice(0,4)})</p>
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
