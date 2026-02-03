export interface Notes {
    date: string,
    notes: Note[]
}

export interface Note {
    id: number;
    title: string;
    content: string;
    date: string;
    tags: string[];
}

// export const mockNotes: Note[] = [
//     {
//         id: "1",
//         title: "Titre note 1",
//         content: "Je suis la première note de test.",
//         date: "2026-01-01",
//         tags: ["first note", "test"]
//     },
//     {
//         id: "2",
//         title: "Titre note 2",
//         content: "Je suis la première note de test.",
//         date: "2026-01-01",
//         tags: ["first note", "test"]
//     },
//     {
//         id: "3",
//         title: "Titre note 3",
//         content: "Je suis la deuxième note de test.",
//         date: "2026-01-27",
//         tags: ["test", "for dev"]
//     }
// ];

export const mockNotes: Notes[] = [
    {
        date: "2026-01-01",
        notes: [
            {
                id: 1,
                title: "Titre note 1",
                content: "Je suis la première note de test.",
                date: "2026-01-01",
                tags: ["first note", "test"]
            },
            {
                id: 2,
                title: "Titre note 2",
                content: "Je suis la première note de test.",
                date: "2026-01-01",
                tags: ["first note", "test"]
            }
        ]
    },
    {
        date:"2026-01-29",
        notes: [
            {
                id: 3,
                title: "Titre note 3",
                content: "Je suis la deuxième note de test.",
                date: "2026-01-27",
                tags: ["test", "for dev"]
            }
        ]
    }
];