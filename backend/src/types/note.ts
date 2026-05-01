export interface Note {
    date: string;
    content: string;
    tags: Tag[];
}

export interface NoteTimestamps {
    createdAt: Date;
    updatedAt: Date;
}

export interface Tag {
    key: string;
    label: string;
}

export type NoteWithTimestamps = Note & NoteTimestamps;