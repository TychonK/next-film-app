import React from "react";

import Link from "next/link"; 
import NotFound from "./notFound";

const baseUrlPerson = "https://image.tmdb.org/t/p/w500/";

export default function Crew({ castData }) {
  const sortedCrewData = castData.crew.sort( // !!! cast.data.CREW
    (a, b) => b.popularity - a.popularity
  );

    return (
      <>
        {(!sortedCrewData || sortedCrewData.length == 0) && <NotFound />}
        {sortedCrewData.map((person) => {
          return (
            <Link href={`/people/${person.id}`} className="mr-8 last:mr-0">
              <li
                className="flex flex-col justify-center h-full w-full p-4 duration-200 group hover:scale-105 text-center rounded-md md:w-64 lg:w-80 xl:w-96 bg-gray-100 text-gray-800"
                style={{ minWidth: "200px", maxWidth: "220px" }}
              >
                <img
                  src={
                    person.profile_path
                      ? baseUrlPerson + person.profile_path
                      : "/male-icon.svg"
                  }
                  alt={person.name}
                  className="self-center flex-shrink-0 w-48 bg-center bg-cover rounded-md bg-gray-500"
                />

                <div className="mt-4">
                  <p className="text-xl font-bold leadi group-hover:underline">{person.name}</p>
                  <p className="font-medium text-xl">{person.character}</p>
                  <p className="italic">{person.job}</p>
                </div>
              </li>
            </Link>
          );
        })}
      </>
    );
}
