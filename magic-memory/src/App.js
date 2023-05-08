import { useState, useEffect } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
    { src: "/img/helmet-1.png" },
    { src: "/img/potion-1.png" },
    { src: "/img/ring-1.png" },
    { src: "/img/scroll-1.png" },
    { src: "/img/shield-1.png" },
    { src: "/img/sword-1.png" },
];

export default function App() {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);

    const shuffleCards = () => {
        resetTurn();
        const shuffleCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random(), matched: false, open: false }));

        setCards(shuffleCards);
        setTurns(0);
    };

    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    };

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.src === choiceTwo.src) {
                setCards(oldCards => {
                    return oldCards.map(card => {
                        return card.src === choiceOne.src ? {...card, matched: true} : card;
                    })
                });
            }
            setTimeout(() => {
                resetTurn();
            }, 1000);
        }
    }, [choiceOne, choiceTwo])

    useEffect(() => {
        shuffleCards();
    }, []);

    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns((prevTurns) => prevTurns + 1);
        setDisabled(false)
    };

    return (
        <div className="App">
            <h1>Magic Match</h1>
            <button onClick={shuffleCards}>New Game</button>
            <p>Turns: {turns}</p>
            <div className="card-grid">
                {cards.map((card) => (
                    <SingleCard
                        key={card.id}
                        card={card}
                        handleChoice={handleChoice}
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                        disabled={disabled}
                    />
                ))}
            </div>
        </div>
    );
}
