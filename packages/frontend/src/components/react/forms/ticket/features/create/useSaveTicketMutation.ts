import { type CreateTicket } from "@/utils/models/formDataTypes/createTicket";
import { type Database } from "@/utils/models/supabase";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useSaveTicketMutation() {
    return useMutation({
        mutationFn: async function (value: CreateTicket) {
            const { data } = await axios<
                Database["public"]["Functions"]["create_ticket"]["Returns"]
            >({
                method: "post",
                url: "/api/tickets/post",
                data: value,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return data;
        },
    });
}
