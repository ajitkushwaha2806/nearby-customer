import { Search, ArrowRight } from "lucide-react";

export function SearchBar({
    placeholder = "Search...",
    value = "",
    onChange,
    onSubmit,
}) {
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit?.(value);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="
        flex
        h-14
        min-w-0
        flex-1
        items-center
        rounded-[10px]
        bg-white
        px-4
        shadow-sm
        ring-1
        ring-black/[0.03]
        sm:h-16
        sm:px-5
      "
        >
            <Search
                size={27}
                strokeWidth={2}
                className="mr-4 shrink-0 text-neutral-900"
                aria-hidden="true"
            />

            <input
                type="search"
                value={value}
                onChange={(event) => onChange?.(event.target.value)}
                placeholder={placeholder}
                aria-label={placeholder}
                className="
          min-w-0
          flex-1
          bg-transparent
          text-sm
          text-neutral-900
          outline-none
          placeholder:text-neutral-400
          sm:text-base
        "
            />

            {value && (
                <button
                    type="submit"
                    aria-label="Submit search"
                    className="
            ml-2
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-neutral-900
            text-white
            transition
            hover:bg-neutral-700
          "
                >
                    <ArrowRight size={17} />
                </button>
            )}
        </form>
    );
}