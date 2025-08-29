import Header from "./Header";
import FoodOptions from "./FoodOptions";
import GroceryOptions from "./GroceryOptions";
import DineoutOptions from "./DineoutOptions";
import Restaurants from "./Restaurants";

export default function Home() {
  return (
    <>
      <Header></Header>
      <FoodOptions></FoodOptions>
      <GroceryOptions></GroceryOptions>
      <DineoutOptions></DineoutOptions>
    </>
  );
}
