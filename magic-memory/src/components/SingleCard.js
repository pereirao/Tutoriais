import "./SingleCard.css";

export default function SingleCard({ card, handleChoice, flipped, disabled }) {

    const handleClick = () => {
        handleChoice(card);
    };

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img src={card.src} className="front" alt="" />
                <img src="/img/cover.png" className="back" onClick={disabled ? "" : handleClick} alt="" />
            </div>
        </div>
    );
}
