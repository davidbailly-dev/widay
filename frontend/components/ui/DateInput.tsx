"use client";

import { useState } from "react";

export default function DateInput() {
    const today = new Date().toISOString().split('T')[0];
    const [value, setValue] = useState(today);

    return (
        <input
            className="bg-stone-800 p-2 rounded-lg border-0 focus:ring-2 focus:outline-0 focus:ring-stone-600"
            type="date"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
}