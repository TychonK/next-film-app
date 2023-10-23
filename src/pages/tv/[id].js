import { useRouter } from "next/router"

export default function Tv() {
    const router = useRouter();
    const { id } = router.query;

    return (
        <p>Tv id: { id }</p>
    )
}