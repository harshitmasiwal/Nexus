import React from "react";
import ReactDOM from "react-dom/client"
import Header from "./components/Header";
import Body from "./components/Body";

function Main(){
    return (
        <><Header></Header>
          <Body></Body>
        </>
    )
}

const display = ReactDOM.createRoot(document.getElementById('root'))
display.render(<Main></Main>)