import axios from "axios";
import useSWR from "swr";
import { useRouter } from "next/router";

import Loader from "@/components/loader";
import GoBackBtn from "@/components/goBackBtn";

import { initAxios } from "@/lib/axios";

initAxios();

export async function getServerSideProps(context) {
  const { id } = context.query;

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );

    return {
      props: {
        data: response.data,
      },
    };
  } catch (error) {
    return {
      props: {
        error: "An error occurred while fetching the data.",
      },
    };
  }
}

export default function FilmDetailPage() {
  const router = useRouter();
    const { id } = router.query;
    
    const { data, error, isLoading } = useSWR(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      fetchFilmData
    );

    async function fetchFilmData(url) {
        let data
      await axios
        .get(url)
        .then(function (res) {
            data = res.data;
        })
        .catch((er) => {
          console.log(er);
        });
        return data
    }

    return (
      <>
        {isLoading && <Loader />}
        {data && (
        <div>
            <GoBackBtn/>
            <h1>Film Detail Page</h1>
            <p>Film ID: {id}</p>
            <p>Budget: $ {data.budget}</p>
          </div>
        )}
      </>
    );
};
