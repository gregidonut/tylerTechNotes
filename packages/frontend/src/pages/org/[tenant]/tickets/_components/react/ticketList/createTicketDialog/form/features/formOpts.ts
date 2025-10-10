import { formOptions } from "@tanstack/react-form";
import { type CreateTicket } from "@/utils/models/formDataTypes/createTicket";

const defaultTicket: CreateTicket = { title: "", body: null };
export const formOpts = formOptions({
    defaultValues: defaultTicket,
});
