import "./App.css";
import React, { useState, useEffect } from "react";
import Snake from ".";

function App() {
  const [x, setX] = useState(610);
  const [y, setY] = useState(341.5);
  const [direction, setDirection] = useState("left");
  const [score, setScore] = useState(0);
  const [start, setStart] = useState(false);
  const [collided, setCollided] = useState(false);
  const [snakeCoords, setSnakeCoords] = useState([]);

  window.addEventListener("keydown", (e) => handleKeyDown(e));

  function handleKeyDown(e) {
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
          setX(610);
          setY(341.5);
          setDirection("left");
          setStart(true);
          setSnakeCoords([]);
        }
        break;
      default:
        return;
    }
  }

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        setHeadCoordinates();
      }, 200);
      return () => clearInterval(interval);
    }

    function setHeadCoordinates() {
      if (start) {
        switch (direction) {
          case "left":
            if (x - 20 >= 350) {
              console.log(`(${x}, ${y})`);
              setSnakeCoords([{ x, y }, ...snakeCoords]);
              setX(x - 20);
            } else {
              setStart(false);
              setCollided(true);
            }
            break;
          case "right":
            if (x + 20 <= 870) {
              setSnakeCoords([{ x, y }, ...snakeCoords]);

              setX(x + 20);
            } else {
              setStart(false);
              setCollided(true);
            }
            break;
          case "up":
            if (y - 20 >= 80) {
              setSnakeCoords([{ x, y }, ...snakeCoords]);
              setY(y - 20);
            } else {
              setStart(false);
              setCollided(true);
            }
            break;
          case "down":
            if (y + 20 <= 620) {
              setSnakeCoords([{ x, y }, ...snakeCoords]);
              setY(y + 20);
            } else {
              setStart(false);
              setCollided(true);
            }
            break;
          default:
            return;
        }
      }
    }
  }, [start, x, y]);

  function buildSnake() {
    let snake = [];
    snake.push(
      <div
        className="snake"
        key="0"
        id="head"
        style={{ top: y, left: x }}
      ></div>
    );
    for (let n in snakeCoords) {
      snake.push(
        <div
          className="snake"
          id={`body ${n + 1}`}
          key={n + 1}
          style={{ top: snakeCoords[n].y, left: snakeCoords[n].x }}
        ></div>
      );
    }
    return snake;
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
        <div id="gameScreen">{buildSnake()}</div>
      </div>
      {gameOver()}
    </div>
  );
}

export default App;
