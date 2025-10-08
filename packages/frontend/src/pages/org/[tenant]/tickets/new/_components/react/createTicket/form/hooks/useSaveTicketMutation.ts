import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { type CreateTicket } from "@/utils/models/formDataTypes/createTicket";

export function useSaveTicketMutation() {
    return useMutation({
        mutationFn: async function (value: CreateTicket) {
            const { data } = await axios<{ ticket_id: string }>({
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
