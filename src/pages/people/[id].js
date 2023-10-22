import axios from "axios";
import useSWR from "swr";
import { useRouter } from "next/router";

import Loader from "@/components/loader";
import GoBackBtn from "@/components/goBackBtn";
import numeral from "numeral";

import { initAxios } from "@/lib/axios";
import NotFound from "@/components/notFound";

initAxios();

const baseUrlBig = "https://image.tmdb.org/t/p/original/";
const baseUrlSmall = "https://image.tmdb.org/t/p/w500/";

export default function PersonDetailsPage() {
    const router = useRouter();
    const { id } = router.query;

    const requestUrl =
      `https://api.themoviedb.org/3/person/${id}?append_to_response=images%2Ccombined_credits&language=en-US`;

    const { data, error, isLoading } = useSWR(requestUrl, fetchFilmData);

    async function fetchFilmData(url) {
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
    
    if (!id) {
        return <NotFound />
    }

    return (
      <div className="text-white px-4 md:px-32">
        {isLoading && <Loader />}
        {data && (
          <>
            <GoBackBtn />
            <h1 className="text-9xl font-extralight">{data.name}</h1>
            <p>Person ID: {id}</p>
            <p className="text-medium text-2xl">Born on: {data.birthday}</p>
            <p className="text-medium text-2xl">
              Place of birth: {data.place_of_birth}
            </p>
            <div>
              <p className="text-xl font-semibold">Bio: </p>
              <p>{data.biography}</p>
            </div>
            <div className="scroll-container flex flex-row overflow-y-hidden overflow-x-scroll w-64">
              {data.images.profiles.map((profile) => {
                return (
                  <img
                    src={baseUrlBig + profile.file_path}
                    alt="person img"
                    className="w-64"
                  />
                );
              })}
            </div>
            <div>
                        <p>Participated in:</p>  
                       
            </div>
          </>
        )}
      </div>
    );
}
