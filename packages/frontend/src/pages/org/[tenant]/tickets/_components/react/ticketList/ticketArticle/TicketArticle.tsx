import { type Ticket } from "@/pages/api/tickets/ticket";
import React from "react";

export default function TicketArticle({
    ticketData: t,
}: {
    ticketData: Ticket;
}): React.JSX.Element {
    return (
        <article>
            <header className="flex-row-between">
                <h3 className="flex-row-start">
                    <a
                        href={`tickets/details/${t.ticket_id}`}
                        className="line-clam-1 max-w-48 truncate"
                    >
                        {t.title}
                    </a>
                </h3>
                <strong
                    className={(function () {
                        let cls =
                            "ml-auto min-w-24 rounded-sm text-center text-xs text-drac-background";
                        switch (t.status) {
                            case "closed":
                                cls += " " + "bg-drac-green";
                                break;
                            case "in_progress":
                                cls += " " + "bg-drac-yellow";
                                break;
                            case "open":
                                cls += " " + "bg-drac-red";
                                break;
                        }

                        return cls;
                    })()}
                >
                    {t.status}
                </strong>
            </header>
        </article>
    );
}
