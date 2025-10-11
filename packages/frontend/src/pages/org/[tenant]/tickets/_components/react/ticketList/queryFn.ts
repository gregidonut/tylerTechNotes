import { type Database } from "@/utils/models/supabase";
import axios from "axios";

export default async function (): Promise<
    Database["public"]["Functions"]["get_tickets"]["Returns"]
> {
    const { data } = await axios({
        method: "get",
        url: "/api/tickets/get",
    });
    return data;
}
