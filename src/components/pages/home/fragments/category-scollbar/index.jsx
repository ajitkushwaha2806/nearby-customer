"use client";
import { MenuService } from "@/services/ui/menu";
import { useQuery } from "@tanstack/react-query";
import { useRestaurant } from "@/hooks/useRestaurant";
import { CategoryCard } from "./fragments/category-card";

export const CategoryScrollbar = () => {
    const { slug } = useRestaurant();
    const {
        data: categories = [],
        isPending,
        isError,
        error,
    } = useQuery({
        queryKey: ["categories", slug],
        queryFn: async () => {
            const response = await MenuService.category.getAll(slug);
            return response?.data || response || [];
        },
        enabled: !!slug,
    });

    if (isError) {
        return (
            <div className="px-4 py-6 text-sm text-red-500">
                Error: {error?.message || "Failed to load categories"}
            </div>
        );
    }

    if (isPending) {
        return (
            <section className="w-full pt-6 animate-pulse">
                <div className="mb-5 flex items-center justify-between px-4 sm:px-6">
                    <div className="h-6 w-40 rounded-md bg-neutral-200" />
                </div>

                <div className="flex gap-4 overflow-x-auto px-4 pb-3 sm:gap-5 sm:px-6 hide-scrollbar">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex w-[84px] shrink-0 flex-col items-center gap-2.5 sm:w-[96px]">
                            <div className="aspect-square w-full rounded-2xl bg-neutral-200 border-[2.5px] border-white shadow-[0_2px_8px_rgba(0,0,0,0.02)]" />
                            <div className="h-3 w-12 rounded bg-neutral-200" />
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="w-full pt-6">
            <div className="mb-5 flex items-center justify-between px-4 sm:px-6">
                <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    Explore Categories
                </h2>
            </div>

            <div className="flex gap-4 overflow-x-auto px-4 pb-3 sm:gap-5 sm:px-6 snap-x snap-mandatory hide-scrollbar">
                {categories.map((category) => (
                    <div
                        key={category?._id || category?.id}
                        className="shrink-0 snap-start"
                    >
                        <CategoryCard.V2 category={category} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategoryScrollbar;