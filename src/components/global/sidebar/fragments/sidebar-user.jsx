"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { ChevronRightIcon, BadgeCheckIcon, LogOutIcon, LogInIcon, UserPlusIcon, UserIcon, SettingsIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function NavUser({ user, onLogout }) {
    const { isMobile } = useSidebar()
    if (!user) {
        return (
            <SidebarMenu>
                <SidebarMenuItem className="grid grid-cols-2 gap-2">
                    <SidebarMenuButton
                        render={<a href="/login" />}
                        className="group flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 font-poppins transition-colors duration-200 hover:bg-gray-50 dark:border-gray-800 dark:bg-transparent dark:text-gray-200 dark:hover:bg-gray-800"
                    >
                        <LogInIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                        <span>Login</span>
                    </SidebarMenuButton>

                    <SidebarMenuButton
                        render={<a href="/register" />}
                        className="group flex h-10 items-center justify-center gap-2 rounded-lg bg-orange-500 text-sm font-medium text-white font-poppins shadow-sm transition-colors duration-200 hover:bg-orange-600"
                    >
                        <UserPlusIcon className="size-4 transition-transform duration-200 group-hover:scale-110" />
                        <span>Register</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        )
    }

    const initials = user?.name?.substring(0, 2).toUpperCase()

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="group flex w-full items-center gap-3 overflow-hidden rounded-lg p-2 transition-colors duration-200 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-2 data-[state=open]:bg-gray-100 dark:hover:bg-gray-800 dark:data-[state=open]:bg-gray-800"
                        >
                            <Avatar className="h-9 w-9 rounded-lg ring-1 ring-black/5 transition-transform duration-200 group-hover:scale-105">
                                <AvatarImage src={user?.avatar} alt={user?.name} className="object-cover" />
                                <AvatarFallback className="rounded-lg bg-orange-500/10 font-semibold text-orange-600">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid min-w-0 flex-1 text-left leading-tight">
                                <div className="flex items-center gap-1">
                                    <span className="truncate text-sm font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                                        {user?.name}
                                    </span>
                                    <BadgeCheckIcon className="size-3.5 shrink-0 fill-blue-50 text-blue-500" />
                                </div>
                                <span className="truncate text-xs text-gray-500">{user?.email}</span>
                            </div>
                            <ChevronRightIcon className="ml-auto size-4 shrink-0 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-[260px] rounded-lg border border-gray-100 bg-white p-1.5 shadow-lg shadow-black/5 dark:border-gray-800 dark:bg-zinc-950"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={12}
                    >
                        <DropdownMenuGroup>
                            <DropdownMenuLabel className="p-0 font-normal">
                                <div className="flex items-center gap-3 px-2 py-2.5">
                                    <Avatar className="h-9 w-9 rounded-lg ring-1 ring-black/5">
                                        <AvatarImage src={user?.avatar} alt={user?.name} className="object-cover" />
                                        <AvatarFallback className="rounded-lg bg-orange-500/10 font-semibold text-orange-600">
                                            {initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid min-w-0 flex-1 text-left leading-tight">
                                        <div className="flex items-center gap-1">
                                            <span className="truncate text-sm font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                                                {user?.name}
                                            </span>
                                            <BadgeCheckIcon className="size-3.5 shrink-0 fill-blue-50 text-blue-500" />
                                        </div>
                                        <span className="truncate text-xs text-gray-500">{user?.email}</span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator className="my-1.5 bg-gray-100 dark:bg-gray-800" />

                        <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <a
                                    href="/account"
                                    className="group flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2 py-2 text-sm text-gray-700 transition-colors duration-150 hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                                >
                                    <UserIcon className="size-4 text-gray-400 group-hover:text-gray-600" />
                                    <span className="font-medium">Account</span>
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <a
                                    href="/settings"
                                    className="group flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2 py-2 text-sm text-gray-700 transition-colors duration-150 hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                                >
                                    <SettingsIcon className="size-4 text-gray-400 group-hover:text-gray-600" />
                                    <span className="font-medium">Settings</span>
                                </a>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator className="my-1.5 bg-gray-100 dark:bg-gray-800" />

                        <DropdownMenuItem onClick={onLogout} asChild>
                            <button
                                type="button"
                                className="group flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2 py-2 text-sm text-red-600 transition-colors duration-150 hover:bg-red-50 focus:bg-red-50 dark:hover:bg-red-950/40"
                            >
                                <LogOutIcon className="size-4 transition-transform duration-150 group-hover:-translate-x-0.5" />
                                <span className="font-medium">Log out</span>
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}