import React from "react";
import { Button } from "react-aria-components";
import { useFormContext } from "../hooks/formContext.tsx";

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
                        <Button
                            type={label}
                            className="cursor-pointer rounded-lg border-b-[4px]
                                border-drac-comment bg-drac-comment px-6 py-2
                                transition-all hover:-translate-y-[1px]
                                hover:border-b-[6px] hover:brightness-110
                                active:translate-y-[2px] active:border-b-[2px]
                                active:brightness-90"
                            isPending={isSubmitting ?? isValidating ?? false}
                        >
                            {label}
                        </Button>
                    </div>
                );
            }}
        </form.Subscribe>
    );
}
