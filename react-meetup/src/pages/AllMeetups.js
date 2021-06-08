import { useState, useEffect } from "react";

import MeetupList from "../components/meetups/MeetupList";

function AllMeetupsPage() {
    const [state, setState] = useState({
        isLoading: true,
        meetups: []
    });

    useEffect(() => {
        console.info("Fetching meetups...");
        fetch(
            "https://react-tutorial-1159e-default-rtdb.firebaseio.com/meetups.json",
        ).then(response => {
            return response.json();
        }).then(data => {
            const meetups = [];

            for (const key in data) {
                const meetup = {
                    id: key,
                    ...data[key]
                }
                meetups.push(meetup);
            }
            setState({
                isLoading: false,
                meetups
            })
        });
    }, []);

    if (state.isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        )
    }
    else {
        return (
            <section>
                <h1>All Meetups</h1>
                <MeetupList meetups={state.meetups} />
            </section>
        )
    }

}

export default AllMeetupsPage;
