import { useRouter } from "next/router"

export default function PersonDetailsPage() {
    const router = useRouter()
    const { id } = router.query
    
    return (
        <>
            <h1>
                Person ID: {id}
            </h1>
        </>
    )
}