import React from "react";

import useSWR from "swr";
import { useRouter } from "next/router";

import axios from "axios";
import { initAxios } from "@/lib/axios";

import Loader from "@/components/loader";
import NotFound from "@/components/notFound";
import GoBackBtn from "@/components/goBackBtn";

initAxios();

const baseUrlBig = "https://image.tmdb.org/t/p/original/";

export default function Gallery() {
    const router = useRouter();
    const { id, name } = router.query;

    const requestUrl = `https://api.themoviedb.org/3/person/${id}/images`

    const { data, error, isLoading } = useSWR(requestUrl, fetchPersonGallery)

    async function fetchPersonGallery(url) {
      let data;
      await axios
        .get(url)
        .then(function (res) {
          data = res.data;
        })
        .catch((er) => {
          console.log(er);
        });
      return data;
    } 

    if (isLoading) {
      return <Loader />;
    }

    if (error || !data) {
      return <NotFound />;
    }

    return (
      <>
        <div className="relative">
          <GoBackBtn className="xl:absolute xl:top-1/2 xl:-translate-y-1/2 mb-4 xl:mb-0" />
          <h2 className="text-white font-extralight text-center text-6xl mb-8">
            {name
              ? `Gallery for ${name}`
              : `Gallery for ID ${id} (Name not available)`}
          </h2>
        </div>
        <div className="bg-gray-950 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 rounded-md">
          {data.profiles.map((img, index) => (
            <div key={index} className="bg-gray-700 rounded-md overflow-hidden">
              <img
                src={baseUrlBig + img.file_path}
                alt={`Image ${index}`}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      </>
    );
}