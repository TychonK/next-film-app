import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import FavoriteLink from "./FavoriteLink";


export default function Nav({ toggleMenu, closeMenu, menuState }) {
  const [query, setQuery] = useState("")

  const router = useRouter();

  const handleMobileMenuToggle = () => {
    toggleMenu();
  };

  const hadleChange = async (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = () => {
    closeMenu();
    router.push(`/discover?search=${query}`);
  };

  return (
    <>
      <header className="p-4 bg-gray-800 text-gray-100 relative z-30">
        <div className="container flex justify-between lg:px-12 h-16 mx-auto relative nav">
          <ul className="items-stretch hidden space-x-3 lg:flex">
            <li className="flex">
              <Link
                rel="noopener noreferrer"
                href="/"
                className={
                  `${
                    router.pathname == "/"
                      ? "text-violet-400 border-violet-400"
                      : "text-white-400 border-white-400"
                  }` +
                  " flex items-center px-4 -mb-1 border-b-2 border-transparent"
                }
              >
                Home
              </Link>
            </li>
            <li className="flex">
              <Link
                rel="noopener noreferrer"
                href="/discover"
                className={
                  `${
                    router.pathname == "/discover"
                      ? "text-violet-400 border-violet-400"
                      : "text-white-400 border-white-400"
                  }` +
                  " flex items-center px-4 -mb-1 border-b-2 border-transparent"
                }
              >
                Discover
              </Link>
            </li>
            <li className="flex">
              <FavoriteLink />
            </li>
          </ul>
          <a
            rel="noopener noreferrer"
            href="/"
            aria-label="Back to homepage"
            className="hidden lg:flex items-center"
          >
            <img
              src="/logo.svg"
              className="w-10 h-10 absolute left-1/2 -translate-x-1/2"
            />
          </a>
          <div className="flex items-center md:space-x-4">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <button
                  type="submit"
                  title="Search"
                  className="p-1 focus:outline-none focus:ring"
                >
                  <svg
                    fill="currentColor"
                    viewBox="0 0 512 512"
                    className="w-4 h-4 text-gray-100"
                  >
                    <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                  </svg>
                </button>
              </span>
              <input
                onChange={hadleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
                disabled={router.pathname.includes("/discover") && "disabled"}
                value={query}
                type="search"
                name="Search"
                placeholder="Search..."
                className="w-32 py-2 pl-10 text-base rounded-md sm:w-auto focus:outline-none bg-gray-800 text-gray-100 focus:bg-gray-900 disabled:opacity-20"
              />
            </div>
            <button
              onClick={handleSubmit}
              type="button"
              className="hidden px-6 py-2 font-semibold rounded lg:block bg-violet-400 text-gray-900"
            >
              search
            </button>
          </div>
          <button
            title="Open menu"
            type="button"
            className="p-4 rounded-full lg:hidden relative"
            onClick={() => {
              handleMobileMenuToggle();
            }}
          >
            <div
              className={`absolute h-14 top-1 inset-0 bg-gray-950 duration-700 rounded-full ${
                menuState ? "scale-100" : "scale-0"
              }`}
            ></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={"mx-auto w-6 h-6 text-gray-100 relative"}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </header>
    </>
  );
}
