import React, { useState } from 'react';

import "./styles.css";

function Counter() {

    const addCount = () => {
        setCount(prev => ++prev);
    }
    const subtractCount = () => {
        setCount(prev => --prev);
    }

    const [count, setCount] = useState(() => 0);

    return (
        <div className="counter">
            <button className="counter__btn" onClick={subtractCount}>&laquo;</button>
            <span className="counter__number">{count}</span>
            <button className="counter__btn" onClick={addCount}>&raquo;</button>
        </div>
    );
};

export default Counter;
