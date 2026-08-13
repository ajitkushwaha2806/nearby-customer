import { cookies } from "next/headers";
import { JsonResponse } from "@/lib/api/responseHandler";

export const GET = async () => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        
        if (!token) {
            return JsonResponse.error("Not authenticated", 401);
        }

        const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        const user = {
            name: payload.phone || "User",
            phone: payload.phone,
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + payload.phone,
        };

        return JsonResponse.success(user, "User fetched successfully", 200);
    } catch (error) {
        return JsonResponse.error("Invalid token", 401);
    }
};