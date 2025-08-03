import React, { useRef, useState } from "react";
import ReactDOM from "react-dom/client";

//using useRef hook -> it lets to store the refrence of the value that can be needed
//in short across re render apne pass value sustain kare

//making a stopwatch out of it using the setinterval and useref hook

function Main() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  function start() {
    if (!isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
        console.log(time);
      }, 1000);
      setIsRunning(true);
    }
  }

  function stop() {
    if (isRunning) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setIsRunning(false);
    }
  }

  function reset() {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setTime(0);
      setIsRunning(false);
  }

  return (
    <>
      <div className="stopwatch">
        <h2>Stop Watch</h2>
        <h2>Seconds Elasped : {time}</h2>
        <div>
          <button onClick={start}>Start</button>
          <button onClick={stop}>Stop</button>
          <button onClick={reset}>Reset</button>
        </div>
      </div>
    </>
  );
}

const display = ReactDOM.createRoot(document.getElementById("root"));
display.render(<Main></Main>);
