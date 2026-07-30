import { IconType } from "react-icons";

export interface ApiResponse {
    success: boolean,
    message: string,
    data?: {
        note?: Note,
        notes?: Note[],
        pagination?: Pagination,
    },
}

export interface MessageType {
    content: string,
    type: 'success' | 'error' | 'warning' | 'neutral' | 'loading',
    visible: boolean,
}

export interface NavItemType {
    label: string,
    href: string,
    icon?: IconType,
}

export interface Note {
    _id: string,
    date?: string,
    content: string,
    tags: Tag[],
    pagination?: Pagination,
}

export interface Pagination {
    page: number,
    limit: number,
    total: number,
    totalPages: number,
    hasPrevPage: boolean,
    hasNextPage: boolean
}

export interface Tag {
    key: string,
    label: string
}