import { useContext } from 'react';

import Card from '../ui/Card';
import classes from './MeetupItem.module.css';
import FavoritesContext from '../../store/favorites-context';

function MeetupItem(props) {
    const favoritesCtx = useContext(FavoritesContext);

    const { ...meetup } = props.meetup;

    const isFavorite = favoritesCtx.isFavorite(meetup.id);

    function toggleFavorite() {
        if (isFavorite) {
            favoritesCtx.removeFavorite(meetup.id);
        } else {
            favoritesCtx.addFavorite(meetup);
        }
    }

    return (
        <li className={classes.item} id={meetup.id}>
            <Card>
                <div className={classes.image}>
                    <img src={meetup.image} alt={meetup.title} />
                </div>
                <div className={classes.content}>
                    <h3>{meetup.title}</h3>
                    <address>{meetup.address}</address>
                    <p>{meetup.description}</p>
                </div>
                <div className={classes.actions}>
                    <button onClick={toggleFavorite}>{isFavorite ? "Remove from Favorites" : "Add To Favorites"}</button>
                </div>
            </Card>
        </li>
    )
}

export default MeetupItem;