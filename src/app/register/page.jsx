"use client";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/frontend/auth.service";
import { MailIcon, LockIcon, UserIcon, Loader2, ArrowRight } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        toast.promise(AuthService.register({ name, email, password }), {
            loading: "Creating your account...",
            success: (data) => {
                router.push("/home");
                return `Welcome to the platform, ${data?.user?.name || "User"}!`;
            },
            error: (err) => {
                setIsLoading(false);
                return err.message || "Failed to register. Please try again.";
            }
        });
    };

    return (
        <div className="flex min-h-[100dvh] flex-col bg-white font-poppins sm:items-center sm:justify-center sm:bg-slate-50 sm:p-4">
            <div className="flex w-full max-w-md flex-1 flex-col justify-center px-6 py-12 sm:flex-none sm:rounded-2xl sm:bg-white/90 sm:p-10 sm:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] sm:backdrop-blur-xl">
                <div className="mb-8 flex flex-col items-center text-center">
                    <img
                        src="/assets/images/food-delivery.png"
                        alt="Join Us"
                        className="w-full max-w-[240px] object-contain py-4"
                    />
                </div>

                <form onSubmit={handleRegister} className="space-y-6">
                    <div className="relative group">
                        <div className="absolute -top-2.5 left-3 z-10 bg-white px-1.5 sm:bg-white">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 transition-colors group-focus-within:text-orange-600">
                                Full Name
                            </span>
                        </div>
                        <div className="relative flex items-center rounded-2xl border border-gray-300 bg-white transition-all focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 sm:bg-white/90">
                            <div className="pointer-events-none flex items-center pl-3.5">
                                <UserIcon className="h-5 w-5 text-orange-500" />
                            </div>
                            <input
                                id="name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="h-14 w-full bg-transparent px-3 text-base text-neutral-900 outline-none placeholder:text-transparent focus:placeholder:text-gray-400"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -top-2.5 left-3 z-10 bg-white px-1.5 sm:bg-white">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 transition-colors group-focus-within:text-orange-600">
                                Email Address
                            </span>
                        </div>
                        <div className="relative flex items-center rounded-2xl border border-gray-300 bg-white transition-all focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 sm:bg-white/90">
                            <div className="pointer-events-none flex items-center pl-3.5">
                                <MailIcon className="h-5 w-5 text-orange-500" />
                            </div>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-14 w-full bg-transparent px-3 text-base text-neutral-900 outline-none placeholder:text-transparent focus:placeholder:text-gray-400"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -top-2.5 left-3 z-10 bg-white px-1.5 sm:bg-white">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 transition-colors group-focus-within:text-orange-600">
                                Password
                            </span>
                        </div>
                        <div className="relative flex items-center rounded-2xl border border-gray-300 bg-white transition-all focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 sm:bg-white/90">
                            <div className="pointer-events-none flex items-center pl-3.5">
                                <LockIcon className="h-5 w-5 text-orange-500" />
                            </div>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="h-14 w-full bg-transparent px-3 text-base text-neutral-900 outline-none placeholder:text-transparent focus:placeholder:text-gray-400"
                                placeholder="••••••••"
                            />
                        </div>
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
                                    Register
                                    <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm font-medium text-neutral-600">
                    Already have an account?{" "}
                    <a href="/login" className="font-bold text-orange-500 transition-colors hover:text-orange-600">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
}
