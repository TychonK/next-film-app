import Link from "next/link";

export default function CardPpl(props) {
  const { personData } = props;
  const baseUrlImg = "https://image.tmdb.org/t/p/w500/";

  return (
    <Link
      href={`/people/${personData.id}`}
    >
      <div
        className="max-w-lg mx-auto rounded-lg p-4 hover:scale-105 duration-300 group"
        style={{ minWidth: "260px", maxWidth: "260px" }}
      >
        <img
          className="w-36 h-36 rounded-full mx-auto object-cover object-center"
          src={baseUrlImg + personData.profile_path}
          alt="Profile picture"
        />
        <h2 className="text-center text-2xl font-semibold mt-3 truncate">
          {personData.name}
        </h2>
        <p className="text-center text-gray-600 mt-1">
          {personData.known_for_department.replace(/ing/g, "or")}
        </p>
        <div className="flex justify-center mt-5">
          <p className="text-blue-500 hover:text-blue-700 mx-3 group-hover:underline">
            Details
          </p>
        </div>
      </div>
    </Link>
  );
}
