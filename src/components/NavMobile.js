import Link from "next/link";

export default function NavMobile({close, open}) {
    const handleCloseMobileMenu = () => {
        close(false);
    };

  return (
    <ul
      className={`${
        open ? "left-0" : "left-full"
      } duration-700 lg:hidden bg-gray-700 fixed z-10 top-24 right-0 py-12 px-8 text-white font-extralight rounded-b-md`}
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
    </ul>
  );
}