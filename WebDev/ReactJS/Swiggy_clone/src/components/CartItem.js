import { useDispatch } from "react-redux";
import { IncrementItems, DecrementItems } from "../stores/CartSlice";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="w-full flex justify-between items-center p-4 border-b border-gray-200 bg-white rounded-lg shadow-sm mb-3">
      {/* Left: Image + Info */}
      <div className="flex gap-4 items-start">
        <img
          src={`https://media-assets.swiggy.com/${item.imageId}`}
          alt={item.name}
          className="w-20 h-20 rounded-lg object-cover border"
        />

        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
          <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-medium">₹{(item?.defaultPrice || item?.price)/ 100}</span>
          </p>
        </div>
      </div>

      {/* Right: Counter */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center border rounded-lg">
          <button
            onClick={() => dispatch(DecrementItems({ id: item.id }))}
            className="px-3 py-1 text-lg font-bold text-gray-700 hover:bg-gray-100"
          >
            -
          </button>
          <span className="px-3 py-1">{item.quantity}</span>
          <button
            onClick={() => dispatch(IncrementItems({ id: item.id }))}
            className="px-3 py-1 text-lg font-bold text-gray-700 hover:bg-gray-100"
          >
            +
          </button>
        </div>
        <p className="text-sm font-medium text-gray-700">
          ₹{((item?.defaultPrice || item?.price) / 100) * item.quantity}
        </p>
      </div>
    </div>
  );
}
