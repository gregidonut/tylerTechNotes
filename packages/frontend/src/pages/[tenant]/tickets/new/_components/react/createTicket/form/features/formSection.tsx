import React from "react";
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
                            return value.split(" ").length > 3
                                ? undefined
                                : "atleast three words";
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
