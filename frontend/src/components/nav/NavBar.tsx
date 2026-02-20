import { MdAddCircle, MdCalendarMonth, MdOutlineManageSearch } from "react-icons/md";

import NavItem from "@/components/nav/NavItem";

const navLinks = [
    {
        key: "add",
        label: "Ajouter",
        href: "/add",
        icon: MdAddCircle,
    },
    {
        key: "search",
        label: "Rechercher",
        href: "/search",
        icon: MdOutlineManageSearch,
    },
    {
        key: "calendar",
        label: "Calendrier",
        href: "/calendar",
        icon: MdCalendarMonth,
    },
];

export default function NavBar() {
    return (
        <div className="p-4 bg-stone-800 border-r-2 border-stone-600">
            <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
                <li className="flex flex-col" key={link.key}>
                    <NavItem href={link.href} label={link.label} icon={link.icon} />
                </li>
            ))}
            </ul>
        </div>
    );
}