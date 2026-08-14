import { cookies } from "next/headers";
import merchantApi from "@/lib/api/merchantInstance";
import { JsonResponse } from "@/lib/api/responseHandler";

export const PUT = async (req, { params }) => {
    try {
        const { domain } = await params;
        if (!domain) {
            return JsonResponse.error("Restaurant domain/slug is required", 400);
        }

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return JsonResponse.error("Not authenticated", 401);
        }

        const body = await req.json();

        const response = await merchantApi.put(`/api/${domain}/user/profile`, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const responseData = response.data.data || response.data;
        return JsonResponse.success(responseData, response.data.message || "Profile updated successfully", response.status || 200);
    } catch (error) {
        return JsonResponse.error(error.response?.data?.message || "Merchant API error", error.response?.status || 500);
    }
};
