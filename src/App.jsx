import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

import { getRandomeColor } from "./utils/getRandomColor";
import { getRandomNumber } from "./utils/getRandomNumber";

import { MdLightMode, MdNightlight } from "react-icons/md";

function App() {
  const [dots, setDots] = useState([]);
  const [draw, setDraw] = useState(false);
  const [piece, setPiece] = useState(0);
  const [finish, setFinish] = useState(false);
  const [dark, setDark] = useState(false);

  const clickHandle = (e) => {
    const { clientX, clientY } = e;
    const dot = {
      x: clientX,
      y: clientY,
      color: getRandomeColor(),
      id: getRandomNumber(),
    };
    setPiece(piece + 1);
    setDots([...dots, dot]);

    if (finish === true) {
      setDots([]);
      setFinish(false);
      setDraw(true);
    }
  };

  //Do raffle to dot for dot's length does not change 3 seconds if change 3 seconds dont start raffle

  useEffect(() => {
    if (piece === dots.length || draw) {
      if (dots.length === 0) return;

      setDraw(true);
      const interval = setInterval(() => {
        //Get Random one dot and remove others every 300ms
        const randomDot = dots[Math.floor(Math.random() * dots.length)];
        setDots([randomDot]);
        setPiece(0);
        setDraw(false);
        setFinish(true);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [piece, dots]);

  const changeDarkLightMode = () => {
    const body = document.querySelector("body");
    setDark(!dark);
    body.classList.toggle("dark");
  };

  return (
    <main>
      <h3
        className="title"
        style={{
          top: finish ? "32px" : "-100vh",
        }}
      >
        lucky finger
      </h3>

      <div className="wrapper" onClick={clickHandle}>
        {dots.map((dot) => (
          <div
            key={dot.id}
            style={{
              left: dot.x,
              top: dot.y,
              backgroundColor: dot.color,
            }}
            className={`dot ${draw ? "drawing" : ""} ${finish ? "finish" : ""}`}
          ></div>
        ))}
      </div>

      <div className="footer">
        <div>
          see on <a href="https://github.com/hsnlbnan/lucky-finger">github</a>
        </div>

        <button className="mode" onClick={changeDarkLightMode}>
          {dark ? <MdNightlight /> : <MdLightMode />}
        </button>
      </div>
    </main>
  );
}

export default App;
