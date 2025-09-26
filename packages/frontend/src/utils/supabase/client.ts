import type { APIContext } from "astro";
import { createClient } from "@supabase/supabase-js";

export function createSupabaseClient(Astro: APIContext) {
    return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!, {
        async accessToken() {
            const { getToken } = Astro.locals.auth();
            const token = await getToken();
            return token;
        },
    });
}
