import type { APIContext } from "astro";
import { type Database } from "@/utils/models/supabase";
import { createBrowserClient } from "@supabase/ssr";

export function getSupabaseBrowserClient(Astro: APIContext) {
    return createBrowserClient<Database>(
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
