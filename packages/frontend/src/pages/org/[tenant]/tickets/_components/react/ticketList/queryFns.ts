import { type Database } from "@/utils/models/supabase";
import axios from "axios";

export async function getTickets(): Promise<
    Database["public"]["Functions"]["get_tickets"]["Returns"]
> {
    const { data } = await axios({
        method: "get",
        url: "/api/tickets/get",
    });
    return data;
}

type GetLinkQueryKey = ["get", "linkTemplate", {}, string];

export async function getLink({
    queryKey,
}: {
    queryKey: GetLinkQueryKey;
}): Promise<Database["public"]["Functions"]["get_link"]["Returns"][number]> {
    const [, , , desc] = queryKey;
    const { data } = await axios({
        method: "get",
        url: `/api/linkTemplates/get?desc=${encodeURIComponent(desc)}`,
    });
    return data;
}
