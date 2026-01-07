import React from "react";
import {
    composeRenderProps,
    Button as RACButton,
    type ButtonProps as RACButtonProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { focusRing } from "@/lib/react-aria-utils";

export interface BouncyButtonProps extends RACButtonProps {
    /** @default 'primary' */
    variant?: "primary" | "destructive";
}

let button = tv({
    extend: focusRing,
    base: "cursor-pointer rounded-lg border-b-[4px] transition-all data-[hovered]:-translate-y-[1px] data-[hovered]:border-b-[6px] data-[hovered]:brightness-110 pressed:translate-y-[2px] pressed:border-b-[2px] pressed:brightness-90",
    variants: {
        variant: {
            primary: "border-drac-comment bg-drac-comment px-6 py-2",
            destructive: "border-drac-red bg-drac-red px-3 py-0.5",
        },
        isDisabled: {
            true: "border-transparent bg-neutral-100 text-neutral-300 dark:border-transparent dark:bg-neutral-800 forced-colors:text-[GrayText]",
        },
        isPending: {
            true: "text-transparent",
        },
    },
    defaultVariants: {
        variant: "primary",
    },
});

export default function BouncyButton(
    props: BouncyButtonProps,
): React.JSX.Element {
    return (
        <RACButton
            {...props}
            className={composeRenderProps(
                props.className,
                (className, renderProps) =>
                    button({
                        ...renderProps,
                        variant: props.variant,
                        className,
                    }),
            )}
        >
            {composeRenderProps(props.children, (children, { isPending }) => (
                <>
                    {children}
                    {isPending && (
                        <span
                            aria-hidden
                            className="absolute inset-0 flex items-center
                                justify-center"
                        >
                            <svg
                                className="h-4 w-4 animate-spin text-white"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    strokeWidth="4"
                                    fill="none"
                                    className="opacity-25"
                                />
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    fill="none"
                                    pathLength="100"
                                    strokeDasharray="60 140"
                                    strokeDashoffset="0"
                                />
                            </svg>
                        </span>
                    )}
                </>
            ))}
        </RACButton>
    );
}
