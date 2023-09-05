import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [time, setTime] = useState(Date.now());
  const [x, setX] = useState(240);
  const [y, setY] = useState(240);
  const [direction, setDirection] = useState("left");
  const [score, setScore] = useState(0);
  const [start, setStart] = useState(false);
  const [collided, setCollided] = useState(false);

  window.addEventListener("keydown", (e) => handleKeyDown(e));

  function handleKeyDown(e) {
    e.preventDefault();
    switch (e.key) {
      case "ArrowLeft":
        setDirection("left");
        break;
      case "ArrowRight":
        setDirection("right");
        break;
      case "ArrowUp":
        setDirection("up");
        break;
      case "ArrowDown":
        setDirection("down");
        break;
      case "Enter":
        if (!start) {
          setX(240);
          setY(240);
          setDirection("left");
          setStart(true);
        }
        break;
      default:
        return;
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (start) {
        console.log(direction);
        switch (direction) {
          case "left":
            if (x - 20 >= 0) setX(x - 20);
            else {
              setStart(false);
              setCollided(true);
            }
            break;
          case "right":
            if (x + 20 < 520) setX(x + 20);
            else {
              setStart(false);
              setCollided(true);
            }
            break;
          case "up":
            if (y - 20 >= 0) setY(y - 20);
            else {
              setStart(false);
              setCollided(true);
            }
            break;
          case "down":
            if (y + 20 < 520) setY(y + 20);
            else {
              setStart(false);
              setCollided(true);
            }
            break;
          default:
            return;
        }
      }
    }, 500);
    console.log(`(${x},${y})`);
    return () => clearInterval(interval);
  }, [direction, start, x, y]);

  function buildHead() {
    return <div id="head" style={{ top: y, left: x }}></div>;
  }

  function gameOver() {
    if (!start && collided) {
      return <h1 id="GameOver">Game Over</h1>;
    } else return;
  }

  return (
    <div className="App">
      <div id="gameScoreContainer">
        <h1 id="score">Score: {score}</h1>
        <div id="gameScreen">{buildHead()}</div>
      </div>
      {gameOver()}
    </div>
  );
}

export default App;
