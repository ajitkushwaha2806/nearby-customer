
export function HeaderActionButton({ action }) {
    return (
        <button
            type="button"
            aria-label={action.ariaLabel}
            onClick={action.onClick}
            disabled={action.disabled}
            className="
        relative
        flex
        h-12
        w-12
        shrink-0
        items-center
        justify-center
        rounded-2xl
        bg-white
        text-neutral-800
        shadow-sm
        ring-1
        ring-black/[0.04]
        transition
        hover:bg-neutral-50
        active:scale-95
        disabled:pointer-events-none
        disabled:opacity-50
        sm:h-14
        sm:w-14
      "
        >
            <span className="flex items-center justify-center">
                {action.icon}
            </span>

            {action.badge !== undefined && action.badge !== null && (
                <span
                    className="
            absolute
            -right-0.5
            -top-0.5
            flex
            min-h-6
            min-w-6
            items-center
            justify-center
            rounded-full
            bg-red-600
            px-1.5
            text-[11px]
            font-bold
            leading-none
            text-white
            ring-2
            ring-white
          "
                >
                    {action.badge}
                </span>
            )}
        </button>
    );
}