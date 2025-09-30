import { createFormHook } from "@tanstack/react-form";
import { lazy } from "react";
import { fieldContext, formContext, useFormContext } from "./formContext.tsx";

const TextField = lazy(function () {
    return import("../components/textField.tsx");
});

function SubscribeButton({ label }: { label: string }) {
    const form = useFormContext();
    return (
        <form.Subscribe
            selector={function (state) {
                return state.isSubmitting;
            }}
        >
            {function (isSubmitting) {
                return <button disabled={isSubmitting}>{label}</button>;
            }}
        </form.Subscribe>
    );
}

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
    fieldComponents: {
        TextField,
    },
    formComponents: {
        SubscribeButton,
    },
    fieldContext,
    formContext,
});
