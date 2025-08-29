export default function Header(){

    return (
        <header className=" bg-[#FF5200]">
        <div className="max-w-[80%] py-8 flex justify-between container mx-auto">
        
            <img className="h-12 w-40" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/static-assets/images/swiggy_logo_white.png"></img>
        
            
            <div className="text-white text-base font-sans font-bold flex gap-8 items-center">
                 <a className=" px-4 py-3" href="https://www.swiggy.com/corporate/">Swiggy Corporate</a>
                 <a className=" px-4 py-3" href="https://partner.swiggy.com/login#/swiggy">Patner with us</a>
                <a className=" px-4 py-3 border-white border rounded-2xl" href="#">Get the App</a>
                <a className="bg-black px-4 py-3 rounded-2xl" href="#">Sign in</a> 
            </div>
        </div>

        <div className="relative">
            <img className="h-110 w-60 absolute left-0" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Veggies_new.png"></img>
            <img className="h-110 w-60 absolute right-0" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Sushi_replace.png"></img>
             <div className="text-5xl font-sans pt-16 pb-8 text-white font-bold text-center container mx-auto">
                Order food & groceries. Discover <br></br> best restaurants. Swiggy it!
            </div>

            <div className="container mx-auto flex gap-2 max-w-[50%]">
                <input className="bg-white px-4 py-2 text-xl w-[40%] rounded-xl" placeholder="Enter your delivery loaction"></input>
                <input className="bg-white px-4 py-2 text-xl w-[60%] rounded-xl"  placeholder="Search for restaurant, item or more"></input>
            </div>

            <div  className="flex justify-center mt-10 gap-1"  >
                <a href="https://www.swiggy.com/restaurants">
                    <img className="h-80 w-90" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/ec86a309-9b06-48e2-9adc-35753f06bc0a_Food3BU.png"></img>
                </a>
                <a href="https://www.swiggy.com/restaurants">
                    <img className="h-80 w-90"  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/b5c57bbf-df54-4dad-95d1-62e3a7a8424d_IM3BU.png"></img>
                </a>
                <a href="https://www.swiggy.com/restaurants">
                    <img className="h-80 w-90"  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/b6d9b7ab-91c7-4f72-9bf2-fcd4ceec3537_DO3BU.png"></img>
                </a>

                
                
                
            </div>

        </div>
           
            
        </header>
    )
}