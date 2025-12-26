import { z } from "zod";

export const CreateTicketSchema = z.strictObject({
    zendesk_id: z.string().min(3),
    body: z.union([z.string(), z.null()]).default(null),
});

export type CreateTicket = z.infer<typeof CreateTicketSchema>;
