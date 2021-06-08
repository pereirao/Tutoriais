import { useContext } from 'react';
import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import FavoritesContext from '../../store/favorites-context';

function MainNavigation() {

    const favoritesCtx = useContext(FavoritesContext);

    const badge = (favoritesCtx.totalFavorites > 0 ? <span className={classes.badge}>{favoritesCtx.totalFavorites}</span> : "" );
    return(
        <header className={classes.header}>
            <div className={classes.logo}>Meetups</div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">All Meetups</Link>
                    </li>
                    <li>
                        <Link to="/new-meetup">New Meetup</Link>
                    </li>
                    <li>
                        <Link to="/favorites">Favorites</Link>
                        {badge}
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation;