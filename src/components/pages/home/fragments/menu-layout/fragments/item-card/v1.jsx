import { NO_IMAGE_PLACEHOLDER } from "./helpers/constants";
import DiaterySymbol from "@/components/global/diatery-symbol";

const ItemCardV1 = ({ item }) => {
    const price = item?.price || item?.base_price || 0;

    return (
        <article className="group flex w-full flex-col gap-3">
            <div className="relative aspect-[1.15/1] w-full overflow-hidden rounded-[20px] bg-muted shadow-sm">
                <img
                    src={item?.image || NO_IMAGE_PLACEHOLDER}
                    alt={item?.name || "Menu item"}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
            </div>

            <div className="flex flex-col px-1">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="line-clamp-2 font-heading text-[17px] font-bold leading-[1.3] text-foreground">
                        {item?.name}
                    </h3>

                    <div className="mt-1 shrink-0">
                        <DiaterySymbol type={item?.dietaryType} size={16} />
                    </div>
                </div>

                <div className="mt-3 flex flex-1 items-end justify-between gap-2 font-heading tracking-tight">
                    <div className="flex flex-col mb-1">
                        <span className="text-[18px] font-bold text-foreground">
                            ₹{price}
                        </span>
                    </div>

                    <button
                        type="button"
                        className="flex w-[100px] items-center justify-center rounded-[10px] border-[1.5px] border-primary/60 bg-background py-2 text-[16px] font-bold tracking-wide text-primary shadow-sm transition-all duration-200 hover:border-primary hover:bg-primary/10 active:scale-[0.95] focus:outline-none"
                    >
                        ADD
                    </button>
                </div>
            </div>
        </article>
    );
};

export default ItemCardV1;