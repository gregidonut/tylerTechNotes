import { cy } from "@/utils/cy";
import React from "react";

export default function DetailsCard({ id }: { id: string }): React.JSX.Element {
    return (
        <section
            {...cy("ticketDetails-section")}
            className="flex-col-start min-h-[30rem] gap-4 rounded-lg border-4
                border-drac-selection p-2.5 sm:max-w-96"
        >
            <header className="w-full">
                <h2 className="text-xl">
                    Ticket details page with id=<strong>{id}</strong>
                </h2>
            </header>
            <main className="flex-col-start flex-1">
                <p>hoho</p>
            </main>
        </section>
    );
}
