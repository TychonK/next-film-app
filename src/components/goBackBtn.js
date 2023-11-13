import { useRouter } from "next/router";

export default function GoBackBtn({ className }) {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleGoBack}
      className={"text-gray-400 duration-100 hover:text-gray-200 inline-flex font-medium items-center border-2 border-gray-400 rounded-md p-1.5 md:py-2 md:px-4" + " " + className}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
        />
      </svg>
      Back
    </button>
  );
}
