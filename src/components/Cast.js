import React from "react";

import Link from "next/link";
import NotFound from "./notFound";

const baseUrlPerson = "https://image.tmdb.org/t/p/w500/";

export default function Cast({ castData }) {
    function customSort(a, b) {
      if (
        (a.profile_path && !b.profile_path)
      ) {
        return -1;
      } else if (
        (!a.profile_path && b.profile_path)
      ) {
        return 1;
      } else {
        return 0;
      }
    }

    const sortedCast = castData.sort(customSort);

  return (
    <>
      {(!sortedCast || sortedCast.length == 0) && <NotFound />}
      {sortedCast.map((person) => {
        return (
          <Link href={`/people/${person.id}`}>
            <li className="h-full w-card/sm md:w-card justify-center p-2 md:p-4 duration-200 group hover:scale-105 text-center rounded-md bg-gray-100 text-gray-800">
              <img
                src={
                  person.profile_path
                    ? baseUrlPerson + person.profile_path
                    : "/male-icon.svg"
                }
                alt={person.name}
                className="self-center flex-shrink-0 w-full rounded-md bg-gray-500"
              />

              <div className="mt-4">
                <p className="text-xl font-bold leadi group-hover:underline">
                  {person.name}
                </p>
                <p className="font-medium text-gray-500 text-xl">{person.character}</p>
              </div>
            </li>
          </Link>
        );
      })}
    </>
  );
}