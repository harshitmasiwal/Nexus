import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

function Main() {
  const [password, setPassword] = useState("baf532ab1836");
  const [length, setLength] = useState(10);
  const [incNumber, setIncNumber] = useState(false);
  const [incCharacter, setIncCharacter] = useState(false);

  //function baar baar create naa ho isliye ham useCallback ka use karte hai

  const genratePassword = useCallback(() => {
    
      let pass = "";
      let str = "abcdefghijklmnopqrstuvwzyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

      if (incNumber === true) {
        str += "1234567890";
      }
      if (incCharacter === true) {
        str += "!@#$%^&*()_+/*-:/";
      }

      for (let i = 0; i < length; i++) {
        pass += str[Math.floor(Math.random() * str.length)];
      }

      setPassword(pass);

  }, [length, incCharacter, incNumber]);

  useEffect(() => {
    genratePassword();
  }, [length, incNumber, incCharacter]);

  return (
    <>
    <h1>Random Password Genrator</h1>
    <div className="box">
      <div>
        <h2>{password}</h2>
      </div>
      <div>
        <label>Length : {length}</label>
        <input
          type="range"
          value={length}
          min={10}
          max={40}
          onChange={(e) => {
            setLength(e.target.value);
          }}
        ></input>
        <br></br>
        <label>Numbers : </label>
        <input
          type="checkbox"
          defaultChecked={incNumber}
          onChange={() => setIncNumber(!incNumber)}
        ></input>
        <br></br>
        <label>Characters : </label>
        <input
          type="checkbox"
          defaultChecked={incCharacter}
          onChange={() => setIncCharacter(!incCharacter)}
        ></input>
      </div>
    </div>
    </>
  );
}

const display = ReactDOM.createRoot(document.getElementById("root"));
display.render(<Main></Main>);
