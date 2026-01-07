import { cy } from "@/utils/cy";
import React, { Suspense, lazy } from "react";
import { DialogTrigger, Heading } from "react-aria-components";
import BouncyButton from "@/components/react/buttons/BouncyButton.tsx";
import { Modal } from "@/components/ui/Modal.tsx";
import { Dialog } from "@/components/ui/Dialog.tsx";

const FormSection = lazy(function () {
    return import(
        "@/components/react/forms/ticket/features/create/FormSection"
    );
});

export default function CreateTicketDialog(): React.JSX.Element {
    return (
        <DialogTrigger>
            <div
                {...cy("createTicket-btn-container")}
                className="flex h-16 w-full flex-row items-center justify-end"
            >
                <BouncyButton variant="primary">create +</BouncyButton>
            </div>
            <Modal>
                <Dialog>
                    {function ({ close }) {
                        return (
                            <>
                                <header className="flex-row-between pb-10">
                                    <Heading
                                        slot="title"
                                        className="text-2xl leading-6
                                            font-semibold"
                                        level={3}
                                    >
                                        Create Ticket
                                    </Heading>
                                    <BouncyButton
                                        variant="destructive"
                                        onPress={close}
                                    >
                                        x
                                    </BouncyButton>
                                </header>
                                <Suspense fallback={<p>loading...</p>}>
                                    <FormSection />
                                </Suspense>
                            </>
                        );
                    }}
                </Dialog>
            </Modal>
        </DialogTrigger>
    );
}
