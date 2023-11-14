import Link from "next/link";

export default function NavMobile({close, open}) {
    const handleCloseMobileMenu = () => {
        close(false);
    };

  return (
    <>
      <ul
        className={`${
          open ? "left-0 bottom-0 py-32" : "left-full bottom-full p-0"
        } duration-700 lg:hidden bg-gray-700 fixed z-10 top-0 right-0 text-white font-extralight rounded-b-md`}
      >
        <li className="flex justify-center">
          <img src="/logo.svg" className="w-10 h-10" />
        </li>
        <li className="text-center text-3xl mt-4">
          <Link href="/" onClick={handleCloseMobileMenu}>
            Home
          </Link>
        </li>
        <li className="text-center text-3xl mt-4">
          <Link href="/discover" onClick={handleCloseMobileMenu}>
            Discover
          </Link>
        </li>
        <li className="text-center text-3xl mt-4">
          <Link href="/favorites" onClick={handleCloseMobileMenu}>
            Favorites
          </Link>
        </li>
        <img
          src="/film.svg"
          className={`${open ? "opacity-100" : "opacity-0"} duration-700 w-20 h-20 absolute z-20 left-1/2 -translate-x-1/2 bottom-32`}
        />
      </ul>
    </>
  );
}