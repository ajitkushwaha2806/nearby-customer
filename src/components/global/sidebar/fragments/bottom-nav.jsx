"use client";
import { usePathname, useRouter } from "next/navigation";
import { SidebarService } from "../services/sidebar.service";

export default function BottomNav() {
    const router = useRouter();
    const pathname = usePathname();

    const TABS = SidebarService.bottomNavItems()
    const activeTab =
        TABS.find((tab) => pathname === tab.href || pathname.startsWith(`${tab.href}/`))
            ?.id ?? "home";

    const activeIndex = TABS.findIndex((tab) => tab.id === activeTab);

    function selectTab(tab) {
        router.push(tab.href);
    }

    return (
        <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center md:hidden">
            <nav
                aria-label="Primary"
                className="relative w-full max-w-sm border border-black/5 bg-white/95 pb-safe pt-2 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] backdrop-blur-sm dark:border-white/10 dark:bg-zinc-900/95"
            >
                <div
                    className="absolute top-0 h-[3px] rounded-full bg-orange-500 transition-all duration-300 ease-out"
                    style={{
                        width: `${100 / TABS.length}%`,
                        left: `${(100 / TABS.length) * activeIndex}%`,
                    }}
                >
                    <div className="mx-auto h-full w-8 rounded-full bg-orange-500" />
                </div>

                <ul className="flex items-center justify-between">
                    {TABS.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = tab.id === activeTab;

                        return (
                            <li key={tab.id} className="flex flex-1">
                                <button
                                    type="button"
                                    onClick={() => selectTab(tab)}
                                    aria-current={isActive ? "page" : undefined}
                                    className="group flex flex-1 flex-col items-center gap-1.5 rounded-2xl py-1.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50"
                                >
                                    <span
                                        className={`flex size-9 items-center justify-center rounded-full transition-all duration-200 ${isActive
                                            ? "bg-orange-500/10 text-orange-500"
                                            : "text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-500 dark:group-hover:bg-white/5"
                                            }`}
                                    >
                                        <Icon
                                            className={`size-5 transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-105"
                                                }`}
                                            strokeWidth={isActive ? 2.25 : 2}
                                        />
                                    </span>

                                    <span
                                        className={`text-[11px] font-medium transition-colors duration-200 ${isActive
                                            ? "text-orange-600"
                                            : "text-gray-400 dark:text-gray-500"
                                            }`}
                                    >
                                        {tab.label}
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}