import { cookies } from "next/headers";
import { JsonResponse } from "@/lib/api/responseHandler";

export const POST = async () => {
    (await cookies()).delete("token");
    return JsonResponse.success(null, "Logged out successfully", 200);
};
