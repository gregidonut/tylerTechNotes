import { createFormHook } from "@tanstack/react-form";
import React, { Suspense, lazy, type ComponentType } from "react";
import { fieldContext, formContext } from "./formContext.tsx";

const TextField = lazy(function () {
    return import("../components/TextField.tsx");
});

const SubscribeButton = lazy(function () {
    return import("../components/SubscribeButton.tsx");
});

function withSuspense<P extends object>(
    Component: ComponentType<P>,
): ComponentType<P> {
    return function (props: P): React.JSX.Element {
        return (
            <Suspense fallback={<p>Loading...</p>}>
                <Component {...props} />
            </Suspense>
        );
    };
}

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
    fieldComponents: {
        TextField: withSuspense(TextField),
    },
    formComponents: {
        SubscribeButton: withSuspense(SubscribeButton),
    },
    fieldContext,
    formContext,
});
