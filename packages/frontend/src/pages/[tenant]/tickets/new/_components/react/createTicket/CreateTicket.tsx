import { TanStackDevtools } from "@tanstack/react-devtools";
import { formOptions, useForm } from "@tanstack/react-form";
import { FormDevtoolsPlugin } from "@tanstack/react-form-devtools";
import {
    QueryClient,
    QueryClientProvider,
    useMutation,
} from "@tanstack/react-query";
import axios from "axios";
import React from "react";

interface Ticket {
    title: string;
    body: string | null;
}

function FormSection(): React.JSX.Element {
    const defaultTicket: Ticket = { title: "", body: null };
    const formOpts = formOptions({
        defaultValues: defaultTicket,
    });
    const saveUserMutation = useMutation({
        mutationFn: async function (value: Ticket) {
            await axios({
                method: "post",
                url: "/api/tickets/post",
                data: value,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        },
    });

    const form = useForm({
        ...formOpts,
        onSubmit: async function ({ formApi, value }) {
            console.log(value);
            await saveUserMutation.mutateAsync(value);
            formApi.reset();
        },
    });
    return (
        <section>
            <form
                onSubmit={function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                    window.location.href = "/tickets";
                }}
            >
                <form.Field
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
                                <label htmlFor={field.name}>title</label>
                                <input
                                    name={field.name}
                                    value={field.state.value}
                                    type="text"
                                    onChange={function (e) {
                                        field.handleChange(
                                            e.currentTarget.value,
                                        );
                                    }}
                                />
                                {!field.state.meta.isValid && (
                                    <p>{field.state.meta.errors.join(",")}</p>
                                )}
                            </div>
                        );
                    }}
                />
                <form.Subscribe
                    selector={function (state) {
                        return [state.canSubmit, state.isSubmitting];
                    }}
                    children={function ([canSubmit, isSubmitting]) {
                        return (
                            <>
                                <button type="submit" disabled={!canSubmit}>
                                    {isSubmitting ? "..." : "Submit"}
                                </button>
                            </>
                        );
                    }}
                />
            </form>
        </section>
    );
}
export default function CreateTicketWrapper(): React.JSX.Element {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <FormSection />
            <TanStackDevtools plugins={[FormDevtoolsPlugin()]} />
        </QueryClientProvider>
    );
}
