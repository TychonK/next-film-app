import React from "react";
import Link from "next/link";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as Slider } from "react-responsive-carousel";

import { calculateBackgroundColor } from '../lib/helpers'


const baseUrlImg = "https://image.tmdb.org/t/p/original"

export default function Carousel({ data }) {
    const settings = {
      emulateTouch: true,
      showThumbs: false,
      infiniteLoop: true,
      autoPlay: true,
      interval: 5000,
      showStatus: false,
    }

  return (
    <div className="mt-4 md:mt-8 md:mx-20 rounded-md overflow-hidden">
      <Slider {...settings}>
        {data.map((item) => (
          <Link
            href={`movie/${item.id}`}
            key={item.id}
            className="block relative group"
          >
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900 opacity-30" />
            <img
              src={baseUrlImg + item.backdrop_path}
              alt={item.title}
              className="shadow-md object-cover w-full h-slider"
            />
            <div className="absolute inset-0 flex flex-col items-start justify-center text-white pl-10">
              <div className="text-4xl font-light mb-2 leading-tight text-left">
                {item.title}
              </div>
              <div className="text-sm text-gray-300">{item.release_date}</div>
              <div
                className="font-bold rounded-xl p-2 text-black mt-4"
                style={{
                  backgroundColor: calculateBackgroundColor(item.vote_average),
                }}
              >
                {item.vote_average == 0 ? "not rated" : item.vote_average.toFixed(1)}
              </div>
            </div>
            <div
              className="opacity-0
              translate-y-1/2 group-hover:opacity-100 group-hover:translate-y-0 duration-300 
              absolute bottom-12 left-1/2 -translate-x-1/2
              flex items-center justify-center
              text-white text-2xl 
              px-4 py-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="32"
                height="32"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-4"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" />
              </svg>
              Discover
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
}
