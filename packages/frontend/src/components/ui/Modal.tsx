import React from "react";
import {
    ModalOverlay,
    type ModalOverlayProps,
    Modal as RACModal,
} from "react-aria-components";
import { tv } from "tailwind-variants";

const overlayStyles = tv({
    base: "absolute top-0 left-0 isolate z-20 h-(--page-height) w-screen bg-black/[50%] text-center backdrop-blur-lg",
    variants: {
        isEntering: {
            true: "animate-in duration-200 ease-out fade-in",
        },
        isExiting: {
            true: "animate-out duration-200 ease-in fade-out",
        },
    },
});

const modalStyles = tv({
    base: "max-h-[calc(var(--visual-viewport-height)*.9)] w-screen rounded-2xl border border-black/10 p-2.5 text-left align-middle font-sans text-neutral-700 shadow-2xl sm:max-w-96 dark:border-drac-selection dark:bg-drac-background dark:text-drac-foreground dark:backdrop-blur-2xl dark:backdrop-saturate-200 forced-colors:bg-[Canvas]",
    variants: {
        isEntering: {
            true: "animate-in duration-200 ease-out zoom-in-105",
        },
        isExiting: {
            true: "animate-out duration-200 ease-in zoom-out-95",
        },
    },
});

export function Modal(props: ModalOverlayProps): React.JSX.Element {
    return (
        <ModalOverlay {...props} className={overlayStyles}>
            <div
                className="sticky top-0 left-0 box-border flex
                    h-(--visual-viewport-height) w-full items-center
                    justify-center"
            >
                <RACModal {...props} className={modalStyles} />
            </div>
        </ModalOverlay>
    );
}
