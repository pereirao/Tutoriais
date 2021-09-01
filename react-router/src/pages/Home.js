import { useEffect } from "react";

const Home = () => {
    useEffect(() => {
        window.scroll(0, 0);
    }, []);
    return (
        <h2>Home Page</h2>
    );
}
 
export default Home;
