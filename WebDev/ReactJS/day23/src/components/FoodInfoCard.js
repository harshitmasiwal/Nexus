export default function FoodInfoCard({ itemDesc }) {
    const info = itemDesc?.card?.info;

    return (
        <div className="w-full flex justify-between gap-6 pb-6 border-b border-gray-200">
            {/* Left Side */}
            <div className="w-[70%]">
                <p className="font-semibold text-lg">{info?.name}</p>
                <p className="font-medium text-base">
                    {"₹" + (info?.defaultPrice || info?.price) / 100}
                </p>
                {info?.ratings?.aggregatedRating?.rating && (
                    <p className="text-sm">
                        <span className="text-green-700">
                            ⭐ {info?.ratings?.aggregatedRating?.rating}
                        </span>
                        <span> ({info?.ratings?.aggregatedRating?.ratingCountV2})</span>
                    </p>
                )}
                <p className="text-gray-600 text-sm mt-1">{info?.description}</p>
            </div>

            {/* Right Side */}
            <div className="w-[30%] flex flex-col items-center">
                <img
                    className="w-36 h-28 rounded-xl object-cover"
                    src={"https://media-assets.swiggy.com/swiggy/image/upload/" + info?.imageId}
                    alt={info?.name}
                />

                {/* Button */}
                <button className="mt-2 w-36 py-1 text-green-600 font-bold rounded-md border border-green-600 bg-white">
                    ADD
                </button>

                {/* Optional Customisable Text */}
                {info?.itemAttribute?.vegClassifier && (
                    <p className="text-xs text-gray-500 mt-1">Customisable</p>
                )}
            </div>
        </div>
    )
}
