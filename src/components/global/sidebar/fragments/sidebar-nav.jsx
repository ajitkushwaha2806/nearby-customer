"use client";
import { cn } from "@/lib/utils";
import { SidebarService } from "../services/sidebar.service";
import {  SidebarGroup,  SidebarGroupLabel,  SidebarMenu,  SidebarMenuButton,  SidebarMenuItem } from "@/components/ui/sidebar";

export function SidebarNav({ activePath = "/" }) {
    const items = SidebarService.getNavItems();

    return (
        <SidebarGroup className="px-3">
            <SidebarGroupLabel className="px-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50 mb-2">
                Menu
            </SidebarGroupLabel>
            <SidebarMenu className="gap-1.5">
                {items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activePath === item.href;

                    return (
                        <SidebarMenuItem key={item.id}>
                            <SidebarMenuButton 
                                render={<a href={item.href} />}
                                isActive={isActive} 
                                tooltip={item.label}
                                className={cn(
                                    "relative flex items-center gap-3 rounded-md px-3 py-4 text-[15px] transition-all duration-300 overflow-hidden group",
                                    isActive 
                                        ? "bg-neutral-200/40 backdrop-blur-md border border-white/60 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] text-neutral-900 font-semibold" 
                                        : "font-medium text-neutral-500 hover:bg-neutral-100/60 hover:text-neutral-900 border border-transparent"
                                )}
                            >
                                <Icon className={cn("size-5", isActive ? "text-neutral-900" : "text-neutral-400")} strokeWidth={isActive ? 2.5 : 2} />
                                <span>{item.label}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
