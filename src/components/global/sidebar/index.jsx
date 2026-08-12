"use client";

import * as React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import { SidebarBrand } from "./fragments/sidebar-brand";
import { SidebarNav } from "./fragments/sidebar-nav";
import { NavUser } from "./fragments/sidebar-user";

export function AppSidebar({ brand, ...props }) {
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarBrand brand={brand} />
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
