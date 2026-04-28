type EnvKey = "DB_CLUSTER" | "DB_NAME" | "DB_USER" | "DB_PASSWORD" | "PORT";

const required: EnvKey[] = ["DB_CLUSTER", "DB_NAME", "DB_USER", "DB_PASSWORD", "PORT"];

export function requireEnv(): Record<EnvKey, string> {
    const missing = required.filter((k) => !process.env[k] || process.env[k]?.trim() === "");

    if (missing.length > 0) {
        throw new Error(`Missing env vars: ${missing.join(", ")}`);
    }

    return {
        DB_CLUSTER: process.env.DB_CLUSTER!,
        DB_NAME: process.env.DB_NAME!,
        DB_USER: process.env.DB_USER!,
        DB_PASSWORD: process.env.DB_PASSWORD!,
        PORT: process.env.PORT!,
    };
}