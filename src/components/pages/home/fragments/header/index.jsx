import { Menu } from "lucide-react";
import { HeaderBrand } from "./brand";
import { SearchBar } from "./search-bar";
import { HeaderActionButton } from "./actions";
import { FilterButton } from "./filter-button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function MenuButton({ onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex h-12 w-12 items-center justify-center rounded-[22px] bg-white text-neutral-900 shadow-sm ring-1 ring-black/[0.03] transition hover:bg-neutral-50 active:scale-95 sm:h-14 sm:w-14"
        >
            <Menu size={24} strokeWidth={2.5} />
        </button>
    );
}

export function ResponsiveHeader({
    brand,
    actions = [],
    showMenu = true,
    searchPlaceholder = "Search...",
    searchValue = "",
    onSearchChange,
    onSearchSubmit,
    showSearch = true,
    showFilter = true,
    onFilterClick,
    filterIcon,
    className = "",
    containerClassName = "",
    rightContent,
}) {
    return (
        <header
            className={`sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] transition-all duration-300 ${className}`}
        >
            <div
                className={`mx-auto w-full max-w-screen-xl px-4 py-3 sm:px-6 lg:px-8 ${containerClassName}`}
            >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
                    <div className="flex w-full items-center justify-between lg:w-auto">
                        <div className="flex items-center gap-3 sm:gap-4">
                            {showMenu && <SidebarTrigger className="-ml-1 text-neutral-600" />}
                            <HeaderBrand brand={brand} />
                        </div>

                        <div className="flex shrink-0 items-center gap-2 lg:hidden">
                            {actions.map((action) => (
                                <HeaderActionButton key={action.id} action={action} />
                            ))}
                            {rightContent}
                        </div>
                    </div>

                    {showSearch && (
                        <div className="flex w-full min-w-0 items-center gap-3 lg:max-w-[500px] xl:max-w-[620px] lg:flex-1">
                            <SearchBar
                                placeholder={searchPlaceholder}
                                value={searchValue}
                                onChange={onSearchChange}
                                onSubmit={onSearchSubmit}
                            />
                            {showFilter && (
                                <FilterButton
                                    onClick={onFilterClick}
                                    icon={filterIcon}
                                />
                            )}
                        </div>
                    )}

                    <div className="hidden shrink-0 items-center gap-3 lg:flex">
                        {actions.map((action) => (
                            <HeaderActionButton key={action.id} action={action} />
                        ))}
                        {rightContent}
                    </div>
                </div>
            </div>
        </header>
    );
}