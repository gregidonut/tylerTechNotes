import type { APIContext } from "astro";
import { createBrowserClient } from "@supabase/ssr";

export function getSupabaseBrowserClient(Astro: APIContext) {
    return createBrowserClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_KEY!,
        {
            async accessToken() {
                const { getToken } = Astro.locals.auth();
                const token = await getToken();
                return token;
            },
        },
    );
}
