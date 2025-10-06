import { cy } from "@/utils/cy";
import { CreateTicketSchema } from "@/utils/models/formDataTypes/createTicket";
import React from "react";
import { Form } from "react-aria-components";
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
        <section
            {...cy("formSection-section")}
            className="flex-col-center min-h-[30rem] rounded-lg border-4
                border-drac-selection p-5 sm:max-w-96"
        >
            <Form
                onSubmit={function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                className="relative w-full"
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
                            <div {...cy("textTitleField-div")}>
                                <field.TextField focus={true} />
                            </div>
                        );
                    }}
                />
                <form.AppForm>
                    <form.SubscribeButton label="submit" />
                </form.AppForm>
            </Form>
        </section>
    );
}
