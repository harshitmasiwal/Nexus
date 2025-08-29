import Card from "./Card";

const Items = [
    { id: 1, Name: "Burger", Price: 102, Rating: 4.3 },
    { id: 2, Name: "Pizza", Price: 250, Rating: 4.6 },
    { id: 3, Name: "Pasta", Price: 180, Rating: 4.2 },
    { id: 4, Name: "Sandwich", Price: 120, Rating: 4.0 },
    { id: 5, Name: "French Fries", Price: 90, Rating: 4.1 },
    { id: 6, Name: "Tacos", Price: 200, Rating: 4.4 },
    { id: 7, Name: "Hot Dog", Price: 110, Rating: 3.9 },
    { id: 8, Name: "Noodles", Price: 160, Rating: 4.3 },
    { id: 9, Name: "Salad", Price: 140, Rating: 4.5 },
    { id: 10, Name: "Momos", Price: 130, Rating: 4.2 },
    { id: 11, Name: "Paneer Roll", Price: 150, Rating: 4.4 },
    { id: 12, Name: "Chicken Wings", Price: 280, Rating: 4.6 },
    { id: 13, Name: "Biryani", Price: 300, Rating: 4.7 },
    { id: 14, Name: "Ice Cream", Price: 100, Rating: 4.8 },
    { id: 15, Name: "Cold Coffee", Price: 120, Rating: 4.5 }
];



export default function Products(){

    return <>
       <div style={{display:"flex" , flexWrap:"wrap", gap:"20px", justifyContent:"center"}}>
            {Items.map( (value) => {
                return <Card key={value.id} name={value.Name} price={value.Price} rating={value.Rating}></Card>
            })}
       </div>
    </>
}