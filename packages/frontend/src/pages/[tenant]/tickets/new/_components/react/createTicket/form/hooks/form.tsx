import { createFormHook } from "@tanstack/react-form";
import { lazy } from "react";
import { fieldContext, formContext } from "./formContext.tsx";

const TextField = lazy(function () {
    return import("../components/textField.tsx");
});

const SubscribeButton = lazy(function () {
    return import("../components/subscribeButton.tsx");
});

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
