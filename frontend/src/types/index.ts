import { IconType } from "react-icons";

export interface NavItemType {
    label: string,
    href: string,
    icon?: IconType,
}

export interface Note {
    _id: string,
    date: string,
    content: string,
    tags: string[],
}

export interface NoteCreate {
    date: string,
    content: string,
    tags?: string[],
}