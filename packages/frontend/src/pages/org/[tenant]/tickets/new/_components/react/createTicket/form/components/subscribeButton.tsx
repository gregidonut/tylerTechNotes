import React, { useEffect, useState } from "react";
import { useFormContext } from "../hooks/formContext.tsx";

export default function SubscribeButton({
    label,
}: {
    label: string;
}): React.JSX.Element {
    const [mounted, setMounted] = useState(false);
    const form = useFormContext();
    useEffect(function () {
        setMounted(true);
    }, []);
    return (
        <form.Subscribe
            selector={function (state) {
                return [state.isSubmitting, state.isValidating];
            }}
        >
            {function ([isSubmitting, isValidating]) {
                return (
                    <div
                        className="absolute bottom-[-6rem] flex w-full flex-row
                            items-center justify-end"
                    >
                        <button
                            type="submit"
                            className="cursor-pointer rounded-lg border-b-[4px]
                                border-drac-comment bg-drac-comment px-6 py-2
                                transition-all hover:-translate-y-[1px]
                                hover:border-b-[6px] hover:brightness-110
                                active:translate-y-[2px] active:border-b-[2px]
                                active:brightness-90"
                            disabled={isSubmitting || isValidating || !mounted}
                        >
                            {label}
                        </button>
                    </div>
                );
            }}
        </form.Subscribe>
    );
}
