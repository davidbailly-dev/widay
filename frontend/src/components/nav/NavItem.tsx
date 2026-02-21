"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavItemType } from "@/types";

export default function NavItem({ label, href, icon: Icon }: NavItemType) {
    const pathname = usePathname();
    const isActive = pathname === href;

    const baseClasses = "flex items-center gap-2 border border-transparent hover:border hover:border-white p-3 rounded-md";
    const activeClasses = "bg-stone-700";
    const inactiveClasses = "bg-transparent";

    return (
        <Link
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
            href={href}
        >
            {Icon && <Icon className="w-5 h-5" />}
            {label}
        </Link>
    );
}