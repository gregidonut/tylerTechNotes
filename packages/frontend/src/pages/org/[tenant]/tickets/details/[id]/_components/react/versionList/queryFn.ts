import { type Database } from "@/utils/models/supabase";
import type { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

export type TicketQueryKey = readonly [
    "get",
    "ticket",
    { id: string },
    {
        userId: string | null | undefined;
        orgId: string | null | undefined;
    },
];

export default async function (
    context: QueryFunctionContext,
): Promise<Database["public"]["Functions"]["get_ticket"]["Returns"]> {
    const queryKey = context.queryKey as TicketQueryKey;

    const { data } = await axios({
        method: "get",
        url: `/api/ticket/get?ticket_id=${queryKey[2].id}`,
    });
    return data;
}
