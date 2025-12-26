import { CreateTicketSchema } from "@/utils/models/formDataTypes/createTicket";
import { getSupabaseBrowserClient } from "@/utils/supabase/browserClient";
import type { APIRoute } from "astro";

export const POST: APIRoute = async function (context) {
    const formData = await context.request.formData();
    const {
        data: ticket,
        success,
        error: err,
    } = CreateTicketSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!success) {
        // none of the error formatting helpers from the docs work
        // expect deprecation warning
        const flattened = err.flatten();

        return new Response(JSON.stringify({ message: flattened }), {
            status: 400,
        });
    }

    const client = getSupabaseBrowserClient(context);
    const { data, error } = await client.rpc("create_ticket", {
        p_zendesk_id: ticket.zendesk_id,
        ...(ticket.body && { p_body: ticket.body }),
    });

    if (error) {
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
        });
    }
    return new Response(JSON.stringify(data), { status: 200 });
};
