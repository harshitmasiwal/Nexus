export default function Header(){
    return (
        <div className="header">

        <img className="image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ2aVKHUduja9219ut8P9CFqhpJMjIk5dqog&s" height="50px" width="80px" />

        <div className="options">
            <button className="btn">MEN</button>
            <button className="btn">WOMEN</button>
            <button className="btn">KIDS</button>
            <button className="btn">HOME</button>
            <button className="btn">BEAUTY</button>
            <button className="btn">GENZ</button>
            <button className="btn">MEN</button>
        </div>

        <input className="searchbar" placeholder="Search for Products,Brand & More... "></input>

        <div className="account">
            <button className="btn2">Profile</button>
            <button className="btn2">Wishlist</button>
            <button className="btn2">Bag</button>
        </div>

        </div>
    )
}