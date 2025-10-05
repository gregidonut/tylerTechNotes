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
                return (
                    <div
                        className="absolute bottom-[-6rem] flex w-full flex-row
                            items-center justify-end"
                    >
                        <button
                            className="cursor-pointer rounded-lg border-b-[4px]
                                border-drac-comment bg-drac-comment px-6 py-2
                                transition-all hover:-translate-y-[1px]
                                hover:border-b-[6px] hover:brightness-110
                                active:translate-y-[2px] active:border-b-[2px]
                                active:brightness-90"
                            disabled={isSubmitting}
                        >
                            {label}
                        </button>
                    </div>
                );
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
