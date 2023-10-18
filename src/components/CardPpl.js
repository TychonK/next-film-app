export default function CardPpl(props) {
  const { personData } = props;
  const baseUrlImg = "https://image.tmdb.org/t/p/w500/";
  const baseUrlBackdrop = "https://image.tmdb.org/t/p/w780/";

  return (
    <li
      style={{ minWidth: "260px", maxWidth: "260px" }}
      className="card cursor-pointer mr-8 mt-8 relative p-6 rounded-md shadow-md bg-gray-900 text-gray-50"
    >
      <div className="front-content">
        <img
          src={baseUrlImg + personData.profile_path}
          alt="Movie poster"
          className="object-cover object-center w-full rounded-md h-72 bg-gray-500"
        />
       
          <span className="block text-xs font-medium tracki uppercase text-violet-400">
            
          </span>
          <h2
            className="text-xl font-semibold truncate"
            title={personData.name}
          >
            {personData.name}
          </h2>
        </div>
    </li>
  );
}
