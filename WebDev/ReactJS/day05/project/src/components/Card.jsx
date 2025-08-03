export default function Card(props){
    return (
        <div className="card"> 
            <img src={props.img}  height="200px" width="200px"/>
            <div style={{textAlign:"center"}}>
                <h3>{props.cloth}</h3>
                <h2>{props.price} OFF</h2>
                <h3>Shop Now</h3>
            </div>
        </div>
    )
}