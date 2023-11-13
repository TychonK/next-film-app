import Link from "next/link";

export default function CardPpl(props) {
  const { personData } = props;
  const baseUrlImg = "https://image.tmdb.org/t/p/w500/";

  return (
    <Link
      href={`/people/${personData.id}`}
    >
      <div
        className="w-card/sm md:w-card mx-auto rounded-lg md:p-4 hover:scale-105 duration-300 group"
      >
        <img
          className="w-20 h-20 md:w-36 md:h-36 rounded-full mx-auto object-cover object-center"
          src={baseUrlImg + personData.profile_path}
          alt="Profile picture"
        />
        <h2 className="text-center text-lg md:text-2xl font-semibold mt-1 md:mt-3 truncate">
          {personData.name}
        </h2>
        <p className="text-center text-gray-600 mt-1">
          {personData.known_for_department.replace(/ing/g, "or")}
        </p>
        <div className="flex justify-center mt-2 md:mt-5">
          <p className="text-blue-500 hover:text-blue-700 mx-3 group-hover:underline">
            Details
          </p>
        </div>
      </div>
    </Link>
  );
}
