    import React from "react"
    import ReactDOM from "react-dom/client"
    import Products from "./Products"
    import Store from "./Store"
    import { Provider, useSelector } from "react-redux"

    function AppWrapper(){

        return(
            <>
                <Provider store={Store}>
                <App></App>
                </Provider>
            </>
        )
        
    }

    function App(){

        const count = useSelector((state)=>state.slice1.count)

        return (
            <>  
                    <div style={{textAlign:"center"}}>
                        <h1>Temp Store ......... Cart items : {count}</h1>
                        <Products></Products>
                    </div>
                
            </>
        )
    }

    const display = ReactDOM.createRoot(document.getElementById("root"))
    display.render(<AppWrapper></AppWrapper>)