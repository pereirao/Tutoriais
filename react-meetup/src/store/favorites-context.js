import { createContext, useState } from "react";

const FavoritesContext = createContext({
    favorites: [],
    totalFavorites: 0,
    addFavorite: (meetup) => {},
    removeFavorite: (id) => {},
    isFavorite: (id) => {}
});

export function FavoritesContextProvider(props) {
    const [userFavorites, setUserFavorites] = useState([]);

    function add(meetup) {
        setUserFavorites(previous => {
            return previous.concat(meetup);
        });
    }

    function remove(id) {
        console.log(userFavorites, id);
        setUserFavorites(previous => {
            return previous.filter(meetup => meetup.id !== id);
        });
    }

    function isFavorite(id) {
        return userFavorites.some(meetup => meetup.id === id);
    }

    const context = {
        favorites: userFavorites,
        totalFavorites: userFavorites.length ? userFavorites.length : 0,
        addFavorite: add,
        removeFavorite: remove,
        isFavorite: isFavorite
    };

    return(
        <FavoritesContext.Provider value={context}>
            {props.children}
        </FavoritesContext.Provider>
    );
        
}

export default FavoritesContext;
