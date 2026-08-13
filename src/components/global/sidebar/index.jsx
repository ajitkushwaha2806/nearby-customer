"use client";
import { X } from "lucide-react";
import { NavUser } from "./fragments/sidebar-user";
import { SidebarNav } from "./fragments/sidebar-nav";
import { SidebarBrand } from "./fragments/sidebar-brand";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, useSidebar } from "@/components/ui/sidebar";

export function AppSidebar({ brand, ...props }) {
    const { isMobile, setOpenMobile } = useSidebar();

    return (
        <Sidebar {...props}>
            <SidebarHeader className="relative">
                <SidebarBrand brand={brand} />
                {isMobile && (
                    <button
                        type="button"
                        onClick={() => setOpenMobile(false)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 z-50 flex size-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-xs transition-all hover:bg-gray-50 hover:text-gray-900 active:scale-95 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
                        aria-label="Close sidebar"
                    >
                        <X className="size-4" />
                    </button>
                )}
            </SidebarHeader>
            <SidebarContent>
                <SidebarNav />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
