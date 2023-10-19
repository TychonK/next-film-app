export default function CardPpl(props) {
  const { personData } = props;
  const baseUrlImg = "https://image.tmdb.org/t/p/w500/";

  return (
    <li
      style={{ minWidth: "260px", maxWidth: "260px" }}
      className="card cursor-pointer mr-8 mt-8 pb-3 relative rounded-md bg-gray-900 text-gray-50"
    >
      <div className="front-content">
        <img
          src={baseUrlImg + personData.profile_path}
          alt="Movie poster"
          className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500"
        />
        <h2
          className="text-2xl text-center pt-1 pb-1 font-thin w-full bg-white bg-opacity-10"
          title={personData.name}
        >
          {personData.name}
        </h2>
        <p className="text-center mt-2 text-xl font-light">
          Known for: <span> {personData.known_for_department} </span>
        </p>
      </div>
    </li>
  );
}
