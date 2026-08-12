import { SlidersHorizontal } from "lucide-react";

export function FilterButton({
    onClick,
    icon,
}) {
    return (
        <button
            type="button"
            aria-label="Open filters"
            onClick={onClick}
            className="
        flex
        h-14
        w-14
        shrink-0
        items-center
        justify-center
        rounded-[22px]
        bg-white
        text-neutral-900
        shadow-sm
        ring-1
        ring-black/[0.03]
        transition
        hover:bg-neutral-50
        active:scale-95
        sm:h-16
        sm:w-16
      "
        >
            {icon ?? (
                <SlidersHorizontal
                    size={25}
                    strokeWidth={2}
                    aria-hidden="true"
                />
            )}
        </button>
    );
}