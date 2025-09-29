import type { APIRoute } from "astro";
import { type Ticket, TicketStatus } from "./ticket";
export const GET: APIRoute = async function (_) {
    const dummyData: Ticket[] = [
        {
            id: 1,
            title: "write supabase book",
            status: TicketStatus.NotStarted,
            author: "Chayan",
        },
        {
            id: 2,
            title: "read more Packt Books",
            status: TicketStatus.InProgress,
            author: "David",
        },
        {
            id: 3,
            title: "Wake videos for the Youtube Channe",
            status: TicketStatus.Done,
            author: "Chayan",
        },
    ];
    return new Response(JSON.stringify(dummyData), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
};
