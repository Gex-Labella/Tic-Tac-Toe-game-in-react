import React, { useRef, useState } from 'react';
import './TicTacToe.css'
import circle_icon from '../Assets/icons8_circle.png'
import cross_icon from '../Assets/icons8_delete.png'

const TicTacToe = () => {
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const titleRef = useRef(null);
    const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);

    const toggle = (e, num) => {
        if (lock || data[num] !== "") {
            return;
        }

        const newData = [...data];
        const currentPlayer = count % 2 === 0 ? "x" : "o";
        newData[num] = currentPlayer;
        
        e.target.innerHTML = `<img src=${currentPlayer === "x" ? cross_icon : circle_icon} alt="${currentPlayer.toUpperCase()}" />`;
        
        setData(newData);
        setCount(prevCount => prevCount + 1);

        checkWin(newData, currentPlayer);
    };
        
    const checkWin = (currentData, player) => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (let pattern of winPatterns) {
            if (pattern.every(index => currentData[index] === player)) {
                won(player);
                return;
            }
        }

        if (currentData.every(cell => cell !== "")) {
            titleRef.current.innerHTML = "It's a draw!";
            setLock(true);
        }
    }  
        
    const won = (winner) => {
        setLock(true);
        titleRef.current.innerHTML = `Congratulations: <img src=${winner === "x" ? cross_icon : circle_icon} alt="${winner.toUpperCase()} wins!">`;
    };

    const resetGame = () => {
        setData(["", "", "", "", "", "", "", "", ""]);
        setCount(0);
        setLock(false);
        titleRef.current.innerHTML = "Tic Tac Toe Game <span>In React</span>";
        document.querySelectorAll('.boxes').forEach(box => box.innerHTML = "");
    };

    return ( 
        <div className='container'>
            <h1 className="title" ref={titleRef}>Tic Tac Toe Game <span>In React</span></h1>
            <div className='board'>
                {[0, 1, 2].map(row => (
                    <div key={row} className={`row${row + 1}`}>
                        {[0, 1, 2].map(col => (
                            <div key={col} className='boxes' onClick={(e) => toggle(e, row * 3 + col)}></div>
                        ))}
                    </div>
                ))}
            </div>
            <button className="Restart" onClick={resetGame}>Restart</button>
        </div>
    )
}

export default TicTacToe