import merchantApi from "@/lib/api/merchantInstance";
import { JsonResponse } from "@/lib/api/responseHandler";

export const GET = async (req, { params }) => {
    try {
        const { domain, categoryId } = await params;

        if (!domain || !categoryId) {
            return JsonResponse.error(
                "Restaurant slug and Category ID are required!",
                400
            );
        }

        const response = await merchantApi.get(
            `/api/${domain}/menu/category/${categoryId}/items`
        );

        const items = response.data?.data?.items || response.data?.items || response.data || [];
        return JsonResponse.success(
            items,
            "Items fetched successfully",
            200
        );
    } catch (err) {
        console.error("GET items error:", err.response?.data || err.message);
        return JsonResponse.error(
            err.response.data?.message || "Internal Server Error!",
            err.response.status
        );
    }
};