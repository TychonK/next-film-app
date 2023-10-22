export default function NotFound() {
    return (
      <div className="flex mt-10 items-center p-6 space-x-4 rounded-md bg-gray-900 text-gray-100">
        <div className="flex items-center self-stretch justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-10 h-10"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <span>
          Unfortunetely, we couldn't find anything here.
        </span>
      </div>
    );
}