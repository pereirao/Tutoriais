import { Link } from 'react-router-dom';

const Navigation = () => {
    return ( 
        <nav>
            <ul className="navigation">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
    );
}
 
export default Navigation;