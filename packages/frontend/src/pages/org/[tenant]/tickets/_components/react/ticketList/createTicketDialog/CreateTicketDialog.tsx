import React, { Suspense, lazy } from "react";

import {
    Button,
    Dialog,
    DialogTrigger,
    Heading,
    Modal,
    ModalOverlay,
} from "react-aria-components";

const FormSection = lazy(function () {
    return import("./form/features/formSection");
});

export default function CreateTicketDialog(): React.JSX.Element {
    return (
        <DialogTrigger>
            <div className="flex h-16 w-full flex-row items-center justify-end">
                <Button
                    className="cursor-pointer rounded-lg border-b-[4px]
                        border-drac-comment bg-drac-comment px-6 py-2
                        transition-all hover:-translate-y-[1px]
                        hover:border-b-[6px] hover:brightness-110
                        active:translate-y-[2px] active:border-b-[2px]
                        active:brightness-90"
                >
                    create +
                </Button>
            </div>
            <ModalOverlay
                className={function ({ isEntering, isExiting }) {
                    return `absolute top-0 left-0 isolate z-10 h-(--page-height)
                    w-full bg-black/25 backdrop-blur
                    ${isEntering ? "animate-in fade-in duration-300 ease-out" : ""}
                    ${isExiting ? "animate-out fade-out duration-200 ease-in" : ""}
                    `;
                }}
            >
                <Modal
                    className={function ({ isEntering, isExiting }) {
                        return `sticky top-0 left-0 box-border flex
                        h-(--visual-viewport-height) w-full items-center
                        justify-center p-4 text-center
                        ${isEntering ? "animate-in zoom-in-95 duration-300 ease-out" : ""}
                        ${isExiting ? "animate-out zoom-out-95 duration-200 ease-in" : ""}
                        `;
                    }}
                >
                    <Dialog
                        className="relative box-border max-h-full w-full
                            overflow-hidden rounded-2xl border-4
                            border-drac-selection bg-drac-background p-6
                            text-left align-middle shadow-xl outline-hidden
                            sm:max-w-96"
                    >
                        {function ({ close }) {
                            return (
                                <>
                                    <header className="flex-row-between py-2.5">
                                        <Heading
                                            slot="title"
                                            className="text-2xl leading-6
                                                font-semibold"
                                        >
                                            Create Ticket
                                        </Heading>
                                        <Button
                                            className="rounded-md border-4
                                                border-drac-selection
                                                bg-drac-background px-2.5 py-1.5
                                                text-xs hover:bg-drac-red
                                                active:bg-drac-selection"
                                            onPress={close}
                                        >
                                            x
                                        </Button>
                                    </header>
                                    <Suspense fallback={<p>loading...</p>}>
                                        <FormSection />
                                    </Suspense>
                                </>
                            );
                        }}
                    </Dialog>
                </Modal>
            </ModalOverlay>
        </DialogTrigger>
    );
}
