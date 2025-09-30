import type { APIRoute } from "astro";
import { getSupabaseBrowserClient } from "@/utils/supabase/browserClient";

export const POST: APIRoute = async function (context) {
    const formData = await context.request.formData();
    const ticket = Object.fromEntries(formData.entries());
    console.log(ticket)

    const client = getSupabaseBrowserClient(context);
    await client.from("tickets").insert(ticket);
    return new Response(null, {status: 200});
};
