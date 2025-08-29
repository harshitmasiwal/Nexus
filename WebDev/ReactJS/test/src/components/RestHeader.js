import { useState } from "react";
import { Search, Percent, HelpCircle, User, ShoppingBag } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

export default function RestHeader() {
  const counter = useSelector((state) => state.cartslice.count);

  const [location, setLocation] = useState("Vasundhara, Ghaziabad");
  console.log("ddw");
  return (
    <header className="w-full shadow-md bg-[#FF5200]">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left Section - Logo + Location */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center">
            <div className=" px-3  flex items-center justify-center rounded-lg">
              <img
                className="w-40 "
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/static-assets/images/swiggy_logo_white.png"
              ></img>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <path d="M12 21s-7-4.35-7-10a7 7 0 1 1 14 0c0 5.65-7 10-7 10z" />
              <circle cx="12" cy="11" r="2.5" fill="white" />
            </svg>
            <span className="text-white truncate max-w-[180px]">
              {location}
            </span>
          </div>
        </div>

        {/* Right Section - Navigation */}
        <nav className="flex items-center gap-8 text-white font-extrabold">
          <div className="flex items-center gap-2 cursor-pointer hover:text-black">
            <Search size={18} /> <span className="font-medium">Search</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-black relative">
            <Percent size={18} /> <span className="font-medium">Offers</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-black">
            <HelpCircle size={18} /> <span className="font-medium">Help</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-black">
            <User size={18} /> <span className="font-medium">Sign In</span>
          </div>
          <Link to="cart">
            <div className="flex items-center gap-2 cursor-pointer hover:text-black">
              <ShoppingBag size={18} />{" "}
              <span className="font-medium">Cart ({counter})</span>
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
}
