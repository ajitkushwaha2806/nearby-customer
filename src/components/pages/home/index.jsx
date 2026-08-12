"use client";
import { useState } from "react"
import { Bell, ShoppingBag } from "lucide-react";
import { AppSidebar } from "../../global/sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ResponsiveHeader } from "./fragments/header"
import PromoCarousel from "./fragments/promo-carousel"
import CategoryScrollbar from "./fragments/category-scollbar"
import { MenuLayout } from "./fragments/menu-layout/fragments"
import BottomNav from "../../global/sidebar/fragments/bottom-nav";

const Home = () => {
    const brandInfo = {
        greeting: (
            <>
                Hi, <span className="font-semibold">Burger Lover!</span> 👋
            </>
        ),
        name: "Barbeqeue",
        tagline: "Fresh. Simple. Always Delicious.",
        logo: (
            <div className="relative size-10 rounded-md overflow-hidden border border-border/50 bg-muted shrink-0 shadow-sm">
                <img
                    src='https://menu-ai.s3.ap-southeast-2.amazonaws.com/uploads/user_3HD6aeoJLlG5oHLDoHdejBZbHgL/logos/1785667736811-182ce7d0-2701-4a38-a1db-548a9613efd6.png'
                    alt="Logo"
                    className="w-full h-full object-cover rounded-md"
                />
            </div>
        ),
    };

    return (
        <SidebarProvider>
            <div className="md:hidden">
                <AppSidebar brand={brandInfo} />
            </div>
            <SidebarInset>
                <div className="w-full mx-auto min-h-screen bg-slate-50 pb-20">
                    <ResponsiveHeader
                        brand={brandInfo}
                        actions={[
                            {
                                id: "notifications",
                                icon: <Bell size={24} strokeWidth={2.5} />,
                                badge: 3,
                                ariaLabel: "Notifications",
                                onClick: () => {
                                    console.log("Notifications");
                                },
                            },
                            {
                                id: "cart",
                                icon: <ShoppingBag size={24} strokeWidth={2.5} />,
                                badge: 2,
                                ariaLabel: "Shopping bag",
                                onClick: () => {
                                    console.log("Cart");
                                },
                            },
                        ]}
                        searchPlaceholder="Search your favorite meal..."
                        onSearchChange={(value) => {
                            console.log("Search:", value);
                        }}
                        onSearchSubmit={(value) => {
                            console.log("Submit:", value);
                        }}
                        onFilterClick={() => {
                            console.log("Filters");
                        }}
                    />

                    <PromoCarousel />
                    <CategoryScrollbar />
                    <MenuLayout.V2 />
                </div>
            </SidebarInset>

            <BottomNav />
        </SidebarProvider>
    )
}

export default Home