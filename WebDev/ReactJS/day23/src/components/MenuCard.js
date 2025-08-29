import { useState } from "react"
import FoodInfoCard from "./FoodInfoCard"

export default function MenuCard({ value }) {
    const [isOpen, setIsOpen] = useState(true)

    // Handle nested categories
    if ("categories" in value) {
        return (
            <div className="w-full px-4">
                <p className="font-bold mt-4 text-2xl">{value.title}</p>
                <div className="ml-4">
                    {value.categories.map((itemDesc) => (
                        <>
                        <MenuCard key={itemDesc?.title} value={itemDesc} />
                        </>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="w-full px-4 mt-4">
            {/* Heading + Toggle */}
            <div className="flex justify-between items-center">
                <p className="font-semibold text-2xl">{value.title}</p>
                <button
                    className="font-bold"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <svg xmlns="http://www.w3.org/2000/svg" 
     fill="none" 
     viewBox="0 0 24 24" 
     stroke-width="2" 
     stroke="currentColor" 
     class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
</svg>
 : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" viewBox="0 0 24 24">
  <path d="M6 9l6 6 6-6" stroke="black" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
}
                </button>
            </div>

            {/* 👇 andar wala hr hata diya */}

            {/* Content */}
            {isOpen && (
                <div className="mt-4 space-y-4 pl-6 pr-6">
                    {value.itemCards?.map((itemDesc) => (
                        <FoodInfoCard
                            key={itemDesc.card.info.id}
                            itemDesc={itemDesc}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
