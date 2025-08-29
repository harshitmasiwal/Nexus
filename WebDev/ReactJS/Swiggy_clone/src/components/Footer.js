export default function Footer(){


    return (
        <>
            <div className="w-full mt-20 mb-20 ">
                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/seo/App_download_banner.png"></img>
            </div>

            <div className="w-[80%] mx-auto container">
                <p className="text-2xl mb-12 font-bold">Cities with food delivery</p>
                <div className="flex flex-wrap gap-x-10 gap-y-5 items-center justify-between">
                        <div className="border h-16 w-58 px-8  flex items-center rounded-2xl text-center border-gray-500">
                                Order food online in Bangalore
                        </div>
                         <div className="border h-16 w-58 px-8  flex items-center rounded-2xl text-center border-gray-500">
                                Order food online in Delhi
                        </div>
                         <div className="border h-16 w-58 px-8  flex items-center rounded-2xl text-center border-gray-500">
                                Order food online in Mumbai
                        </div>
                         <div className="border h-16 w-58 px-8  flex items-center rounded-2xl text-center border-gray-500">
                                Order food online in Jaipur
                        </div>
                         <div className="border h-16 w-58 px-8  flex items-center rounded-2xl text-center border-gray-500">
                                Order food online in Dehradun
                        </div>
                         <div className="border h-16 w-58 px-8  flex items-center rounded-2xl text-center border-gray-500">
                                Order food online in Mysoore
                        </div>
                         <div className="border h-16 w-58 px-8  flex items-center rounded-2xl text-center border-gray-500">
                                Order food online in Ghaziabad
                        </div>
                         <div className="border h-16 w-58 px-8 flex items-center rounded-2xl text-center border-gray-500">
                                Order food online in Noida
                        </div>


                        
                </div>
            </div>

            <footer className="bg-gray-100 text-gray-700 mt-20">
      <div className="container mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Logo & Copy */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/13/Swiggy_logo.png"
                alt="Swiggy Logo"
                className="w-8"
              />
              <span className="text-xl font-semibold text-orange-500">Swiggy</span>
            </div>
            <p className="mt-2 text-sm">© 2025 Swiggy Limited</p>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>About Us</li>
              <li>Swiggy Corporate</li>
              <li>Careers</li>
              <li>Team</li>
              <li>Swiggy One</li>
              <li>Swiggy Instamart</li>
              <li>Swiggy Dineout</li>
              <li>Minis</li>
              <li>Pyng</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-3">Contact us</h3>
            <ul className="space-y-2 text-sm">
              <li>Help & Support</li>
              <li>Partner With Us</li>
              <li>Ride With Us</li>
            </ul>

            <h3 className="font-semibold mt-6 mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>Terms & Conditions</li>
              <li>Cookie Policy</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          {/* Available in */}
          <div>
            <h3 className="font-semibold mb-3">Available in:</h3>
            <ul className="space-y-2 text-sm">
              <li>Bangalore</li>
              <li>Gurgaon</li>
              <li>Hyderabad</li>
              <li>Delhi</li>
              <li>Mumbai</li>
              <li>Pune</li>
            </ul>
            <select className="mt-3 border rounded px-2 py-1 text-sm">
              <option>685 cities</option>
            </select>
          </div>

          {/* Life at Swiggy */}
          <div>
            <h3 className="font-semibold mb-3">Life at Swiggy</h3>
            <ul className="space-y-2 text-sm">
              <li>Explore With Swiggy</li>
              <li>Swiggy News</li>
              <li>Snackables</li>
            </ul>

            <h3 className="font-semibold mt-6 mb-3">Social Links</h3>
            <div className="flex space-x-4 text-xl text-gray-600">
              
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">
            For better experience, download the Swiggy app now
          </p>
          <div className="flex space-x-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS747O0jeOqahbtcMIRk_I2R0pf9K7pdA3Mjw&s"
              alt="App Store"
              className="h-10"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="h-10"
            />
          </div>
        </div>
      </div>
    </footer>
        </>
    )
}