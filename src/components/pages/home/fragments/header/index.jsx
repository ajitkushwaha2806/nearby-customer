"use client";
import { toast } from "sonner";
import { useState } from "react";
import { HeaderBrand } from "./brand";
import { SearchBar } from "./search-bar";
import { useUser } from "@/hooks/useUser";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { HeaderActionButton } from "./actions";
import { FilterButton } from "./filter-button";
import { clearUser } from "@/store/slices/userSlice";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AuthService } from "@/services/frontend/auth.service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, LogIn, UserPlus, LogOut, Loader2, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
    onSearchFocus,
    showSearch = true,
    showFilter = true,
    onFilterClick,
    filterIcon,
    className = "",
    containerClassName = "",
}) {
    const { user, isAuthenticated } = useUser();
    const router = useRouter();
    const dispatch = useDispatch();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            await AuthService.logout();
            dispatch(clearUser());
            toast.success("Logged out successfully");
            router.push("/login");
        } catch (error) {
            toast.error(error.message || "Failed to logout");
        } finally {
            setIsLoggingOut(false);
        }
    };

    const renderUserMenu = () => {
        if (!isAuthenticated || !user) {
            return (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => router.push("/login")}
                        className="h-11 px-4 rounded-xl border border-gray-150/60 hover:bg-neutral-50/50 text-xs font-bold text-gray-700 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
                    >
                        <LogIn size={13} />
                        Login
                    </button>
                    <button
                        onClick={() => router.push("/register")}
                        className="h-11 px-4 bg-orange-500 hover:bg-orange-600 rounded-xl text-white text-xs font-bold shadow-sm transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
                    >
                        <UserPlus size={13} />
                        Register
                    </button>
                </div>
            );
        }

        const initials = user?.name
            ?.split(" ")
            .map((word) => word[0])
            .join("")
            .substring(0, 2)
            .toUpperCase() || "U";

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="relative shrink-0 rounded-full border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer active:scale-95 transition-all">
                        <Avatar className="size-9 rounded-full">
                            <AvatarImage src={user.avatar} className="object-cover" />
                            <AvatarFallback className="font-semibold text-sm bg-orange-50 text-orange-600">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mt-1" align="end">
                    <div className="flex items-center gap-3 p-2 border-b border-gray-100 dark:border-zinc-800">
                        <Avatar className="size-9">
                            <AvatarImage src={user.avatar} className="object-cover" />
                            <AvatarFallback className="font-semibold text-sm bg-orange-50 text-orange-600">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col min-w-0">
                            <span className="text-xs font-bold text-gray-900 truncate dark:text-white">{user.name}</span>
                            <span className="text-[10px] text-gray-400 truncate">{user.phone}</span>
                        </div>
                    </div>
                    <DropdownMenuItem
                        onClick={() => router.push("/profile")}
                        className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 focus:bg-gray-50 dark:text-zinc-300"
                    >
                        <User size={14} />
                        <span>Profile Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-1 bg-gray-100 dark:bg-zinc-800" />
                    <DropdownMenuItem
                        disabled={isLoggingOut}
                        onClick={handleLogout}
                        className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 focus:bg-rose-50 dark:text-rose-400"
                    >
                        {isLoggingOut ? (
                            <Loader2 className="size-3.5 animate-spin" />
                        ) : (
                            <LogOut className="size-3.5" />
                        )}
                        <span>Logout</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    };

    return (
        <header
            className={`sticky top-0 z-50 w-full border-b border-gray-150/40 bg-white/75 backdrop-blur-md dark:border-zinc-850/40 dark:bg-zinc-950/75 shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all duration-300 ${className}`}
        >
            <div
                className={`mx-auto w-full max-w-screen-xl px-4 py-3 sm:px-6 lg:px-8 ${containerClassName}`}
            >
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
                    <div className="flex w-full items-center justify-between lg:w-auto">
                        <div className="flex items-center gap-3 sm:gap-4">
                            {showMenu && (
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-50/60 text-neutral-600 border border-gray-150/40 hover:bg-neutral-100/50 active:scale-95 transition-all md:hidden">
                                    <SidebarTrigger className="p-0 size-8 flex items-center justify-center hover:bg-transparent" />
                                </div>
                            )}
                            <HeaderBrand brand={brand} />
                        </div>

                        {/* Mobile Actions/User Menu */}
                        <div className="flex shrink-0 items-center gap-2 lg:hidden">
                            {actions.map((action) => (
                                <HeaderActionButton key={action.id} action={action} />
                            ))}
                        </div>
                    </div>

                    {showSearch && (
                        <div className="flex w-full min-w-0 items-center gap-3 lg:max-w-[500px] xl:max-w-[620px] lg:flex-1">
                            <SearchBar
                                placeholder={searchPlaceholder}
                                value={searchValue}
                                onChange={onSearchChange}
                                onSubmit={onSearchSubmit}
                                onFocus={onSearchFocus}
                            />
                            {showFilter && (
                                <FilterButton
                                    onClick={onFilterClick}
                                    icon={filterIcon}
                                />
                            )}
                        </div>
                    )}

                    {/* Desktop Actions/User Menu */}
                    <div className="hidden shrink-0 items-center gap-4 lg:flex">
                        {actions.map((action) => (
                            <HeaderActionButton key={action.id} action={action} />
                        ))}
                        {renderUserMenu()}
                    </div>
                </div>
            </div>
        </header>
    );
}