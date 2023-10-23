import React from "react";

export default function ScrollContainer({ children, containerId, btnDark }) {
  
  const handleScrollForward = () => {
    const container = document.getElementById(containerId);

    let scrollAmount

    if (window.innerWidth < 768) {
      scrollAmount = 50;
    }
    else if (window.innerWidth < 1280) {
      scrollAmount = 584;
    }
    else {
      scrollAmount = 1168;
    }

      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }

  const handleScrollBack = () => {
    const container = document.getElementById(containerId);

    let scrollAmount;

    if (window.innerWidth < 768) {
      scrollAmount = -50;
    } else if (window.innerWidth < 1280) {
      scrollAmount = -584;
    } else {
      scrollAmount = -1168;
    }

    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  }
    
  return (
    <div className="relative">
      <button
        onClick={handleScrollBack}
        className={
          "absolute top-1/2 -translate-y-1/2 duration-100 hover:text-blue-500 active:text-violet-700 " +
          `${btnDark ? "text-gray-900" : "text-white"}`
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-16"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <ul
        id={containerId}
        className="flex scroll-container mx-4 md:mx-20 mt-8 pb-3 overflow-y-hidden overflow-x-scroll rounded-md"
      >
        {children}
      </ul>
      <button
        onClick={handleScrollForward}
        className={
          "absolute top-1/2 -translate-y-1/2 right-0 duration-100 hover:text-blue-500 active:text-violet-700 " +
          `${btnDark ? "text-gray-900" : "text-white"}`
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-16"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}