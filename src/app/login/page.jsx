"use client";
import * as Yup from "yup";
import { toast } from "sonner";
import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/frontend/auth.service";
import { MailIcon, LockIcon, Loader2, ArrowRight } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Email is required"),
            password: Yup.string().required("Password is required"),
        }),
        onSubmit: async (values) => {
            setIsLoading(true);

            toast.promise(AuthService.login({ email: values.email, password: values.password }), {
                loading: "Signing in...",
                success: (data) => {
                    router.push("/home");
                    return `Welcome back, ${data?.user?.name || "User"}!`;
                },
                error: (err) => {
                    setIsLoading(false);
                    return err.message || "Failed to sign in. Please try again.";
                },
            });
        },
    });

    return (
        <div className="flex min-h-[90vh] flex-col bg-white font-poppins sm:items-center sm:justify-center sm:bg-slate-50 sm:p-4">
            <div className="flex w-full max-w-md flex-1 flex-col justify-center px-6 py-12 sm:flex-none sm:rounded-2xl sm:bg-white/90 sm:p-10 sm:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] sm:backdrop-blur-xl">
                <div className="mb-8 flex flex-col items-center text-center">
                    <img
                        src="/assets/images/food-delivery.png"
                        alt="Welcome Back"
                        className="w-full max-w-[200px] object-contain py-4"
                    />
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <div className="relative group">
                            <div className="absolute -top-2.5 left-3 z-10 bg-white px-1.5 sm:bg-white">
                                <span className={`text-[11px] font-semibold uppercase tracking-wider transition-colors ${formik.touched.email && formik.errors.email ? "text-red-500" : "text-slate-500 group-focus-within:text-orange-600"}`}>
                                    Email Address
                                </span>
                            </div>
                            <div className={`relative flex items-center rounded-2xl border bg-white transition-all sm:bg-white/90 ${formik.touched.email && formik.errors.email ? "border-red-500 focus-within:ring-1 focus-within:ring-red-500" : "border-gray-300 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500"}`}>
                                <div className="pointer-events-none flex items-center pl-3.5">
                                    <MailIcon className={`h-5 w-5 ${formik.touched.email && formik.errors.email ? "text-red-500" : "text-orange-500"}`} />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="h-14 w-full bg-transparent px-3 text-base text-neutral-900 outline-none placeholder:text-transparent focus:placeholder:text-gray-400"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>
                        {formik.touched.email && formik.errors.email ? (
                            <p className="text-xs font-medium text-red-500 pl-1">{formik.errors.email}</p>
                        ) : null}
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-end">
                            <a href="#" className="text-sm font-semibold text-orange-500 hover:text-orange-600">
                                Forgot password?
                            </a>
                        </div>
                        <div className="relative group">
                            <div className="absolute -top-2.5 left-3 z-10 bg-white px-1.5 sm:bg-white">
                                <span className={`text-[11px] font-semibold uppercase tracking-wider transition-colors ${formik.touched.password && formik.errors.password ? "text-red-500" : "text-slate-500 group-focus-within:text-orange-600"}`}>
                                    Password
                                </span>
                            </div>
                            <div className={`relative flex items-center rounded-2xl border bg-white transition-all sm:bg-white/90 ${formik.touched.password && formik.errors.password ? "border-red-500 focus-within:ring-1 focus-within:ring-red-500" : "border-gray-300 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500"}`}>
                                <div className="pointer-events-none flex items-center pl-3.5">
                                    <LockIcon className={`h-5 w-5 ${formik.touched.password && formik.errors.password ? "text-red-500" : "text-orange-500"}`} />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="h-14 w-full bg-transparent px-3 text-base text-neutral-900 outline-none placeholder:text-transparent focus:placeholder:text-gray-400"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                        {formik.touched.password && formik.errors.password ? (
                            <p className="text-xs font-medium text-red-500 pl-1">{formik.errors.password}</p>
                        ) : null}
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-orange-500 p-4 text-[15px] font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-500/30 disabled:opacity-70 active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <Loader2 className="size-5 animate-spin" />
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm font-medium text-neutral-600">
                    Don't have an account?{" "}
                    <a href="/register" className="font-bold text-orange-500 transition-colors hover:text-orange-600">
                        Sign up now
                    </a>
                </p>
            </div>
        </div>
    );
}
