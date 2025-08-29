import { useSelector } from "react-redux"
import CartItem from "./CartItem"

export default function Cart(){
    const items = useSelector(state=>state.cartslice.items)

    console.log(typeof(items))
    return(
        <div className="max-w-[80%] mx-auto bg-gray-50 rounded-xl shadow-md p-6 mt-10">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}

      {/* Total Section */}
      <div className="flex justify-between items-center mt-6 border-t pt-4">
        <p className="text-lg font-semibold">Total</p>
        <p className="text-xl font-bold text-green-600">
          ₹
          {items.reduce(
            (acc, val) => acc + ((val?.defaultPrice || val?.price)/ 100) * (val.quantity || 1),
            0
          )}
        </p>
      </div>
    </div>
    )
}