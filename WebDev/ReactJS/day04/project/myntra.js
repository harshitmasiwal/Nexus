import React from "react";
import ReactDOM from "react-dom/client"


function Card(props){
    return (
        <div style={{backgroundColor : "green" , padding : "10px", color:"white", height:"350px", }}> 
            <img src={props.img}  height="200px" width="200px"/>
            <div style={{textAlign:"center"}}>
                <h3>{props.cloth}</h3>
                <h2>{props.price} OFF</h2>
                <h3>Shop Now</h3>
            </div>
        </div>
    )
}


//gpt data
const data = [
  { cloth: "Street‑Style Blazer", price: "20‑30%", img: "https://i.pinimg.com/736x/1e/c3/5c/1ec35c3a459d1014c6a91d6cbcbbdea3.jpg" },
  { cloth: "Casual Dark Jacket", price: "15‑25%", img: "https://www.pinterest.com/pin/714946509635821194/" },
  { cloth: "Slim Fit Suit", price: "25‑35%", img: "https://www.pinterest.com/pin/2‑things‑you‑must‑know‑about‑mens‑fashion‑754282637582710613/" },
  { cloth: "Tailored Sportcoat", price: "20‑30%", img: "https://www.pinterest.com/pin/2‑things‑you‑must‑know‑about‑mens‑fashion‑754282637582710613/" },
  { cloth: "Elegant Trio Blazers", price: "30‑40%", img: "https://www.pinterest.com/pin/follow‑pinterest‑nedym24‑style‑fashion‑menswear‑745345807061258032/" },
  { cloth: "Tan & Navy Dual Suits", price: "25‑35%", img: "https://www.pinterest.com/pin/follow‑pinterest‑nedym24‑style‑fashion‑menswear‑745345807061258032/" },
  { cloth: "Brown Sherpa Jacket", price: "18‑28%", img: "https://www.pinterest.com/pin/743727325943102121/" },
  { cloth: "Casual Leather Bomber", price: "15‑25%", img: "https://www.pinterest.com/pin/743727325943102121/" },
  { cloth: "Cozy Sweater Look", price: "20‑30%", img: "https://www.pinterest.com/pin/95420085849151068/" },
  { cloth: "Blue Knit Sweater", price: "15‑25%", img: "https://www.pinterest.com/pin/95420085849151068/" },
  { cloth: "Chambray Shirt Outfit", price: "10‑20%", img: "https://www.pinterest.com/pin/584905070338128670/" },
  { cloth: "Denim & Chinos Casual", price: "12‑22%", img: "https://www.pinterest.com/pin/584905070338128670/" },
  { cloth: "Monochrome Streetwear", price: "20‑30%", img: "https://www.pinterest.com/pin/492722015474483725/" },
  { cloth: "Black Jeans & Boots", price: "25‑35%", img: "https://www.pinterest.com/pin/492722015474483725/" },
  { cloth: "Oversized Utility Coat", price: "15‑25%", img: "https://www.pinterest.com/pin/the‑one‑staple‑every‑man‑should‑have‑490118371946830311/" },
  { cloth: "Slim Trousers & Jacket", price: "20‑30%", img: "https://www.pinterest.com/pin/the‑one‑staple‑every‑man‑should‑have‑490118371946830311/" },
  { cloth: "Layered Olive Outerwear", price: "18‑28%", img: "https://www.pinterest.com/pin/mens‑street‑style‑inspiration‑431923420497271360/" },
  { cloth: "Utility Coat Ensemble", price: "20‑30%", img: "https://www.pinterest.com/pin/mens‑street‑style‑inspiration‑431923420497271360/" },
  { cloth: "Smart Casual Tee & Jeans", price: "10‑20%", img: "https://www.pinterest.com/pin/677791812641923940/" },
  { cloth: "Denim T‑shirt Combo", price: "12‑22%", img: "https://www.pinterest.com/pin/677791812641923940/" }
];


function App(){
    return (
        //header
        //body 
        <div style={{display:"flex" , gap : "10px" , flexWrap:"wrap"}}>
            {/* <Card cloth="Tshit" price="20-30%" img="https://assets.ajio.com/medias/sys_master/root/20240210/MHf3/65c6d4c216fd2c6e6aee32e0/-473Wx593H-466998541-blue-MODEL.jpg"></Card>
            <Card cloth="jeans" price="20-50%" img="https://assets.ajio.com/medias/sys_master/root/20240210/MHf3/65c6d4c216fd2c6e6aee32e0/-473Wx593H-466998541-blue-MODEL.jpg"></Card>
            <Card cloth="kurta" price="45%" img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE9x2-BMHVYCsDxVOetmON9eTq998LneWoBQ&s"></Card>
            <Card cloth="pajyma" price="20%" img="https://assets.ajio.com/medias/sys_master/root/20240210/MHf3/65c6d4c216fd2c6e6aee32e0/-473Wx593H-466998541-blue-MODEL.jpg"></Card>
            <Card cloth="salwar" price="39%" img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE9x2-BMHVYCsDxVOetmON9eTq998LneWoBQ&s"></Card>
            <Card cloth="dhoti" price="10%" img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE9x2-BMHVYCsDxVOetmON9eTq998LneWoBQ&s"></Card> */}

            {/* //the above one code is too messy and redundent to clean it we can just use loop  */}

            {
                data.map((value,index) => {
                    return <Card key={index} cloth={value.cloth} price={value.price} img={value.img}></Card>
                })
            }
            
        </div>
        //footer
        
    )
}

const Display = ReactDOM.createRoot(document.getElementById('root'))
Display.render(<App></App>)