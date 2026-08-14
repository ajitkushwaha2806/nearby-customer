import { ItemImage } from "@/components/global/item-image";
import DiaterySymbol from "@/components/global/diatery-symbol";

const ItemCardV2 = ({ item }) => {
    const price = item?.price || item?.base_price || item?.defaultPrice || 0;

    return (
        <article className="flex w-full items-start justify-between gap-4 rounded-2xl bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
            <div className="flex flex-1 flex-col pb-2">
                <div className="flex items-center gap-2 mb-2">
                    <DiaterySymbol type={item?.dietaryType} size={16} />
                    {item?.isBestseller && (
                        <div className="flex items-center gap-1 rounded-[4px] bg-[#fef2f2] px-1.5 py-0.5 text-[11px] font-bold tracking-wide text-[#e23744]">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            Bestseller
                        </div>
                    )}
                </div>

                <h3 className="font-heading text-[17px] font-bold leading-snug tracking-tight">
                    {item?.name}
                </h3>

                <div className="mt-1.5 flex items-center gap-2">
                    <span className="font-heading text-[16px] font-bold tracking-tight text-gray-900">
                        ₹{price}
                    </span>
                </div>

                {item?.description && (
                    <p className="mt-2.5 line-clamp-2 text-[13px] leading-relaxed text-gray-500 sm:text-[14px]">
                        {item.description}
                    </p>
                )}
            </div>

            <div className="relative shrink-0 pt-1">
                <div className="relative h-[130px] w-[130px] overflow-hidden rounded-[16px] bg-gray-50 sm:h-[140px] sm:w-[140px]">
                    <ItemImage
                        src={item?.image}
                        alt={item?.name}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                </div>

                <button
                    type="button"
                    className="absolute -bottom-4 left-1/2 flex h-10 w-[100px] -translate-x-1/2 items-center justify-center rounded-[10px] bg-white text-[16px] font-bold tracking-wide text-primary shadow-md transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none"
                >
                    ADD
                </button>
            </div>
        </article>
    );
};

export default ItemCardV2;