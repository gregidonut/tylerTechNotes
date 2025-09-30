import type { APIRoute } from "astro";
import { getSupabaseBrowserClient } from "@/utils/supabase/browserClient";

export const GET: APIRoute = async function (context) {
    const client = getSupabaseBrowserClient(context);

    const { data, error } = await client
        .from("tickets")
        .select()
        .order("created_at", { ascending: false });

    if (error) {
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
};
