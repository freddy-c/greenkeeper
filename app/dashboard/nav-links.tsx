"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    TooltipProvider,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Home, LineChart, Package } from "lucide-react";

export default function NavLinks() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href="/dashboard"
                        className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                            isActive("/dashboard")
                                ? "text-accent-foreground bg-accent"
                                : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        <Home className="h-5 w-5" />
                        <span className="sr-only">Dashboard</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href="/dashboard/inventory"
                        className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                            isActive("/dashboard/inventory")
                                ? "text-accent-foreground bg-accent"
                                : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        <Package className="h-5 w-5" />
                        <span className="sr-only">Inventory</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Inventory</TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href="/dashboard/performance"
                        className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                            isActive("/dashboard/performance")
                                ? "text-accent-foreground bg-accent"
                                : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        <LineChart className="h-5 w-5" />
                        <span className="sr-only">Performance</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Performance</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
