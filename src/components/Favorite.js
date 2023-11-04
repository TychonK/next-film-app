import Link from "next/link";

import { useRouter } from "next/router";

export default function FavoriteButton() {
    const router = useRouter()

  return (
    <Link
      href="/favorites"
      className={
        `${
          router.pathname == "/favorites"
            ? "text-violet-400 border-violet-400"
            : "text-white-400 border-white-400"
        }` + " flex items-center px-4 -mb-1 border-b-2 border-transparent"
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        className={router.pathname == "/favorites" ? "stroke-violet-400" : "stroke-white"}
        strokeWidth="2" 
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      <span className="ml-2">Favorites</span>
    </Link>
  );
};