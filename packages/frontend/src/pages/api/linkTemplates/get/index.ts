import { getSupabaseBrowserClient } from "@/utils/supabase/browserClient";
import type { APIRoute } from "astro";

export const GET: APIRoute = async function (context) {
    const linkTemplateDesc = context.url.searchParams.get("desc");
    if (!linkTemplateDesc) {
        return new Response(
            JSON.stringify({ message: "Missing ticket_id parameter" }),
            {
                status: 400,
                headers: { "Content-Type": "application/json" },
            },
        );
    }

    const client = getSupabaseBrowserClient(context);
    const { data, error } = await client
        .rpc("get_link", {
            p_description: decodeURIComponent(linkTemplateDesc),
        })
        .maybeSingle();

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
