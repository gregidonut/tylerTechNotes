import type { CreateTicket } from "@/utils/models/formDataTypes/createTicket";
import { getSupabaseBrowserClient } from "@/utils/supabase/browserClient";
import type { APIRoute } from "astro";

export const POST: APIRoute = async function (context) {
    const formData = await context.request.formData();
    const ticket: CreateTicket = Object.fromEntries(
        formData.entries(),
    ) as unknown as CreateTicket;

    const client = getSupabaseBrowserClient(context);
    const { data, error } = await client
        .from("tickets")
        .insert(ticket)
        .select("ticket_id")
        .single();

    if (error) {
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
        });
    }
    return new Response(JSON.stringify(data), { status: 200 });
};
