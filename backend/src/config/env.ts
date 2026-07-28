type EnvKey = "MONGODB_URI" | "PORT";

const required: EnvKey[] = ["MONGODB_URI", "PORT"];

export function requireEnv(): Record<EnvKey, string> {
    const missing = required.filter((k) => !process.env[k] || process.env[k]?.trim() === "");

    if (missing.length > 0) {
        throw new Error(`Missing env vars: ${missing.join(", ")}`);
    }

    return {
        MONGODB_URI: process.env.MONGODB_URI!,
        PORT: process.env.PORT!
    };
}