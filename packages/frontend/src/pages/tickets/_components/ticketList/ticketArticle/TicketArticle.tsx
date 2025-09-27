import React from "react";
import styles from "./ticketArticle.module.css";
import { type Ticket, TicketStatus } from "@/pages/api/tickets/ticket";

export default function TicketArticle({
    ticketData: t,
}: {
    ticketData: Ticket;
}): React.JSX.Element {
    return (
        <article className={styles.article}>
            <header>
                <h3>{t.title}</h3>
                <strong
                    className={(function () {
                        switch (t.status) {
                            case TicketStatus.Done:
                                return styles.done;
                            case TicketStatus.InProgress:
                                return styles.inProg;
                            case TicketStatus.NotStarted:
                                return styles.noStart;
                        }
                    })()}
                >
                    {t.status}
                </strong>
            </header>
        </article>
    );
}
