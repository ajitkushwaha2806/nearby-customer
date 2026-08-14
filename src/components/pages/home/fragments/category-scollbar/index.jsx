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
            <div className="px-4 py-6 text-sm text-muted-foreground">
                Loading categories...
            </div>
        );
    }

    return (
        <section className="w-full py-6">
            <div className="mb-5 flex items-center justify-between px-4 sm:px-6">
                <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    Explore Categories
                </h2>

                <button
                    type="button"
                    className="text-sm font-medium text-primary transition-colors hover:text-primary/80 hover:underline focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2"
                >
                    See All
                </button>
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