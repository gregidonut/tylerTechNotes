import { CreateTicketSchema } from "@/utils/models/formDataTypes/createTicket";
import React from "react";
import z from "zod";
import { useAppForm } from "../hooks/form";
import { useSaveTicketMutation } from "../hooks/useSaveTicketMutation";
import { formOpts } from "./formOpts";

export default function FormSection(): React.JSX.Element {
    const saveTicketMutation = useSaveTicketMutation();
    const form = useAppForm({
        ...formOpts,
        onSubmit: async function ({ formApi, value }) {
            const { ticket_id } = await saveTicketMutation.mutateAsync(value);
            formApi.reset();
            window.location.href = `/tickets/details/${ticket_id}`;
        },
    });
    return (
        <section>
            <form
                onSubmit={function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
            >
                <form.AppField
                    name="title"
                    validators={{
                        onChangeAsyncDebounceMs: 500,
                        onChangeAsync: function ({ value }) {
                            const { error } =
                                CreateTicketSchema.shape.title.safeParse(value);
                            if (!error) {
                                return undefined;
                            }
                            return z.prettifyError(error);
                        },
                    }}
                    children={function (field) {
                        return (
                            <div>
                                <field.TextField />
                            </div>
                        );
                    }}
                />
                <form.AppForm>
                    <form.SubscribeButton label="submit" />
                </form.AppForm>
            </form>
        </section>
    );
}
