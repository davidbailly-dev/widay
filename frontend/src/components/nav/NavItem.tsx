import { IconType } from "react-icons";

import { NavItemType } from "@/types";

export default function NavItem({ label, href, icon: Icon }: NavItemType) {
    return (
        <a
            className="flex items-center gap-2 bg-stone-800 border border-transparent hover:border hover:border-white p-3 rounded-md"
            href={href}
        >
            {Icon && <Icon className="w-5 h-5" />}
            {label}
        </a>
    );
}