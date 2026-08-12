"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

// In production, these would come from your API based on the restaurant's uploaded promos
const OFFERS = [
    {
        id: "offer-1",
        image: "/assets/1.png",
    },
    {
        id: "offer-2",
        image: "/assets/2.png",
    },
    {
        id: "offer-3",
        image: "/assets/3.png",
    }
];

export const PromoCarousel = () => {
    const scrollRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const scrollLeft = scrollRef.current.scrollLeft;
        const width = scrollRef.current.offsetWidth * 0.95;
        const index = Math.round(scrollLeft / width);
        setActiveIndex(index >= OFFERS.length ? OFFERS.length - 1 : index);
    };

    const scrollTo = (index) => {
        if (!scrollRef.current) return;
        const itemWidth = scrollRef.current.offsetWidth * 0.95;
        const gap = 16;
        scrollRef.current.scrollTo({
            left: (itemWidth + gap) * index,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        if (OFFERS.length <= 1 || isHovered) return;

        const intervalId = setInterval(() => {
            const nextIndex = (activeIndex + 1) % OFFERS.length;
            scrollTo(nextIndex);
        }, 4000);

        return () => clearInterval(intervalId);
    }, [activeIndex, isHovered]);

    if (!OFFERS || OFFERS.length === 0) return null;

    return (
        <section
            className="relative w-full px-4 pt-6 pb-2 sm:px-6"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
        >
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex w-full snap-x snap-mandatory overflow-x-auto hide-scrollbar gap-4 pb-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {OFFERS.map((offer, index) => (
                    <div
                        key={offer.id}
                        className="relative flex aspect-video w-[90%] shrink-0 snap-center overflow-hidden rounded-[20px] bg-gray-100 sm:w-[85%] md:w-[80%]"
                    >
                        <Image
                            src={offer.image}
                            alt={`Promotion ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 90vw, 80vw"
                            priority={index === 0}
                        />
                    </div>
                ))}
            </div>

            {OFFERS.length > 1 && (
                <div className="mt-1 flex items-center justify-center gap-2">
                    {OFFERS.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollTo(index)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === index
                                ? "w-6 bg-primary"
                                : "w-1.5 bg-gray-300 hover:bg-gray-400"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default PromoCarousel;
