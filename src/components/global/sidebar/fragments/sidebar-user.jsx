"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { useUser } from "@/hooks/useUser"
import { useRouter } from "next/navigation"
import { clearUser } from "@/store/slices/userSlice"
import { AuthService } from "@/services/frontend/auth.service"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarMenu, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import {
    LogInIcon,
    UserPlusIcon,
    UserIcon,
    SettingsIcon,
    CrownIcon,
    PlusIcon,
    LogOutIcon,
    Loader2
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function NavUser() {
    const { user } = useUser()
    const dispatch = useDispatch()
    const { isMobile } = useSidebar()
    const router = useRouter()

    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true)
            await AuthService.logout()
            dispatch(clearUser())
            router.push("/login")
            router.refresh()
        } catch (error) {
            console.error("Logout failed:", error)
            setIsLoggingOut(false)
        }
    }

    if (!user) {
        return (
            <SidebarMenu className="w-full">
                <SidebarMenuItem className="w-full">
                    <div className="flex w-full gap-2 rounded-md border border-gray-200/80 bg-white/80 p-2 shadow-sm backdrop-blur-sm dark:border-gray-800 dark:bg-zinc-950/80">
                        <button
                            type="button"
                            onClick={() => router.push("/login")}
                            className="group flex h-10 flex-1 items-center justify-center gap-2 rounded-md text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                            <LogInIcon className="size-4" />
                            <span>Login</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => router.push("/register")}
                            className="group flex h-10 flex-1 items-center justify-center gap-2 rounded-md bg-orange-500 text-sm font-semibold text-white shadow-sm transition-all hover:bg-orange-600"
                        >
                            <UserPlusIcon className="size-4" />
                            <span>Register</span>
                        </button>
                    </div>
                </SidebarMenuItem>
            </SidebarMenu>
        )
    }

    const initials =
        user?.name
            ?.split(" ")
            .map((word) => word[0])
            .join("")
            .substring(0, 2)
            .toUpperCase() || "U"

    return (
        <SidebarMenu className="w-full">
            <SidebarMenuItem className="w-full flex justify-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            type="button"
                            className="group flex items-center justify-center rounded-md p-1 transition-all outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                        >
                            <Avatar className="size-11 rounded-2xl border border-gray-100 shadow-sm transition-transform group-hover:scale-105 dark:border-gray-800">
                                <AvatarImage
                                    src={user?.avatar}
                                    alt={user?.name}
                                    className="rounded-2xl object-cover"
                                />
                                <AvatarFallback className="rounded-2xl bg-gray-200 font-semibold text-gray-700 dark:bg-zinc-800 dark:text-gray-200">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={14}
                        className="w-72 rounded-3xl border border-gray-100 bg-white p-3 shadow-xl shadow-black/5 dark:border-zinc-800 dark:bg-zinc-950"
                    >
                        <div className="flex items-center gap-3.5 px-2 py-2">
                            <Avatar className="size-12 rounded-2xl shadow-sm">
                                <AvatarImage
                                    src={user?.avatar}
                                    alt={user?.name}
                                    className="rounded-2xl object-cover"
                                />
                                <AvatarFallback className="rounded-2xl bg-gray-200 font-semibold text-gray-700 dark:bg-zinc-800 dark:text-gray-200">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>

                            <div className="min-w-0 flex-1">
                                <h4 className="truncate text-base font-bold text-gray-900 dark:text-white">
                                    {user?.name}
                                </h4>
                                <p className="truncate text-xs font-medium text-gray-400 dark:text-gray-500">
                                    {user?.phone}
                                </p>
                            </div>
                        </div>

                        <div className="mt-2 rounded-md bg-[#f5f5f7] p-1.5 dark:bg-zinc-900/60">
                            <DropdownMenuGroup className="space-y-0.5">
                                <DropdownMenuItem
                                    disabled={isLoggingOut}
                                    onClick={(event) => {
                                        event.preventDefault()
                                        handleLogout()
                                    }}
                                    className="flex cursor-pointer items-center gap-3 rounded-xl bg-gray-200/60 px-3 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-300/60 focus:bg-gray-300/60 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 dark:focus:bg-zinc-700"
                                >
                                    {isLoggingOut ? (
                                        <Loader2 className="size-4 animate-spin" />
                                    ) : (
                                        <LogOutIcon className="size-4 stroke-[2.2]" />
                                    )}
                                    <span>{isLoggingOut ? "Logging out..." : "Log out"}</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}