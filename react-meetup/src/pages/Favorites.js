import { useContext } from 'react';

import MeetupList from '../components/meetups/MeetupList';
import FavoritesContext from '../store/favorites-context';

function FavoritesPage() {
    const favoritesCtx = useContext(FavoritesContext);

    return (
        <section>
            <h1>My Favorites</h1>
            <MeetupList meetups={favoritesCtx.favorites} />
        </section>
    )
}

export default FavoritesPage;
