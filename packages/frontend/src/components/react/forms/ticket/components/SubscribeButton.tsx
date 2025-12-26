import React from "react";
import { useFormContext } from "../hooks/formContext.tsx";
import BouncyButton from "@/components/react/buttons/BouncyButton.tsx";

export default function SubscribeButton({
    label,
}: {
    label: "button" | "submit" | "reset";
}): React.JSX.Element {
    const form = useFormContext();
    return (
        <form.Subscribe
            selector={function (state) {
                return [state.isSubmitting, state.isValidating];
            }}
        >
            {function ([isSubmitting, isValidating]) {
                return (
                    <div
                        className="flex min-h-16 w-full flex-row items-center
                            justify-end"
                    >
                        <BouncyButton
                            type={label}
                            isPending={isSubmitting ?? isValidating ?? false}
                        >
                            {label}
                        </BouncyButton>
                    </div>
                );
            }}
        </form.Subscribe>
    );
}
