import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [x, setX] = useState(16);
  const [y, setY] = useState(16);
  const [direction, setDirection] = useState("left");
  const [apple, setApple] = useState({
    x: Math.floor(Math.random() * 16) * 2,
    y: Math.floor(Math.random() * 16) * 2,
  });
  const [score, setScore] = useState(2);
  const [highScore, setHighScore] = useState(0);
  const [start, setStart] = useState(false);
  const [snakeCoords, setSnakeCoords] = useState([]);

  window.addEventListener("keydown", (e) => handleKeyDown(e));

  function randomX() {
    let rand = Math.floor(Math.random() * 16) * 2;
    // eslint-disable-next-line
    while (snakeCoords.some((n) => n.x === rand))
      rand = Math.floor(Math.random() * 16) * 2;
    return rand;
  }

  function randomY() {
    let rand = Math.floor(Math.random() * 16) * 2;
    // eslint-disable-next-line
    while (snakeCoords.some((n) => n.y === rand))
      rand = Math.floor(Math.random() * 16) * 2;
    return rand;
  }

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
          setX(16);
          setY(16);
          setDirection("left");
          setStart(true);
          setHighScore(score);
          setScore(0);
          setSnakeCoords([]);
          setApple({
            x: randomX(),
            y: randomY(),
          });
        }
        break;
      default:
        return;
    }
  }

  useEffect(() => {
    console.log(snakeCoords.length);
    if (start) {
      const interval = setInterval(() => {
        setHeadCoordinates();
      }, 200);
      return () => clearInterval(interval);
    }

    function setHeadCoordinates() {
      let collision = false;
      switch (direction) {
        case "left":
          if (
            x - 2 >= 0 &&
            !snakeCoords.some((n) => n.x === x - 2 && n.y === y)
          ) {
            setX(x - 2);
            if (x - 2 === apple.x && y === apple.y) {
              setScore(score + 1);
              setApple({
                x: randomX(),
                y: randomY(),
              });
            }
          } else {
            setStart(false);
            collision = true;
          }
          break;
        case "right":
          if (
            x + 2 < 34 &&
            !snakeCoords.some((n) => n.x === x + 2 && n.y === y)
          ) {
            setX(x + 2);
            if (x + 2 === apple.x && y === apple.y) {
              setScore(score + 1);
              setApple({
                x: randomX(),
                y: randomY(),
              });
            }
          } else {
            setStart(false);
            collision = true;
          }
          break;
        case "up":
          if (
            y - 2 >= 0 &&
            !snakeCoords.some((n) => n.x === x && n.y === y - 2)
          ) {
            setY(y - 2);
            if (y - 2 === apple.y && x === apple.x) {
              setScore(score + 1);
              setApple({
                x: randomX(),
                y: randomY(),
              });
            }
          } else {
            setStart(false);
            collision = true;
          }
          break;
        case "down":
          if (
            y + 2 < 34 &&
            !snakeCoords.some((n) => n.x === x && n.y === y + 2)
          ) {
            setY(y + 2);
            if (y + 2 === apple.y && x === apple.x) {
              setScore(score + 1);
              setApple({
                x: randomX(),
                y: randomY(),
              });
            }
          } else {
            setStart(false);
            collision = true;
          }
          break;
        default:
          return;
      }
      if (!collision) {
        let currentSC = snakeCoords;
        if (snakeCoords.length > score) {
          currentSC = snakeCoords.slice(0, score);
        }
        setSnakeCoords([{ x, y }, ...currentSC]);
      }
    }
    // eslint-disable-next-line
  }, [start, x, y]);

  function buildSnake() {
    let snake = [];
    snake.push(
      <div
        className="snake"
        key="0"
        id="head"
        style={{ top: y - 2 + "em", left: x + "em" }}
      ></div>
    );
    for (let n = 1; n <= snakeCoords.length; n++) {
      snake.push(
        <div
          className="snake"
          id={`body ${n}`}
          key={n}
          style={{
            top: snakeCoords[n - 1].y - 2 - 2 * n + "em",
            left: snakeCoords[n - 1].x + "em",
          }}
        ></div>
      );
    }
    return snake;
  }

  function placeApple() {
    return (
      <div
        className="apple"
        style={{ top: apple.y + "em", left: apple.x + "em" }}
      ></div>
    );
  }

  function gameOver() {
    if (!start) {
      return <h1 id="GameOver">Game Over</h1>;
    } else return;
  }

  return (
    <div className="App">
      <div id="gameScoreContainer">
        <div>
          <h1 id="score">Score: {score}</h1>
          <br />
          <h1 id="highScore">High Score: {highScore}</h1>
        </div>
        <div id="gameScreen">
          {placeApple()}
          {buildSnake()}
        </div>
      </div>
      {gameOver()}
    </div>
  );
}

export default App;
