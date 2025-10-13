import { type CreateTicket } from "@/utils/models/formDataTypes/createTicket";
import { formOptions } from "@tanstack/react-form";

const defaultTicket: CreateTicket = { title: "", body: null };
export const formOpts = formOptions({
    defaultValues: defaultTicket,
});
