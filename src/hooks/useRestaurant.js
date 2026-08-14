import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/axiosInstance";

export function useRestaurant() {
    let slug = "shreejees-oshiwara";

    // if (typeof window !== "undefined") {
    //     const hostname = window.location.hostname;
    //     const parts = hostname.split(".");
    //     if (parts.length > 0 && parts[0] !== "localhost" && parts[0] !== "www" && parts[0] !== "127") {
    //         slug = parts[0];
    //     }
    // }

    const { data: restaurant, isLoading, isError, error } = useQuery({
        queryKey: ["restaurant", slug],
        queryFn: async () => {
            const response = await api.get(`/api/${slug}`);
            return response.data?.data || response.data || {};
        },
        enabled: !!slug,
    });

    const name = restaurant?.name || slug
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    return {
        slug,
        name,
        restaurant,
        isLoading,
        isError,
        error
    };
}
