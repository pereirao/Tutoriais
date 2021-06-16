import { useRouter } from 'next/router';

export default function Product() {
    const router = useRouter();
    return(
        <>
            <h1>Products</h1>
            <pre>{JSON.stringify(router.query)}</pre>
        </>
    )
}