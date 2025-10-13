import { getSupabaseBrowserClient } from "@/utils/supabase/browserClient";
import type { APIRoute } from "astro";

export const GET: APIRoute = async function (context) {
    const ticket_id = context.url.searchParams.get("ticket_id");
    if (!ticket_id) {
        return new Response(
            JSON.stringify({ message: "Missing ticket_id parameter" }),
            {
                status: 400,
                headers: { "Content-Type": "application/json" },
            },
        );
    }

    const client = getSupabaseBrowserClient(context);
    const { data, error } = await client.rpc("get_ticket", {
        p_ticket_id: ticket_id,
    });

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
