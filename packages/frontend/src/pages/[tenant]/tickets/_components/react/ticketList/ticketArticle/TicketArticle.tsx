import React from "react";
import styles from "./ticketArticle.module.css";
import { type Ticket } from "@/pages/api/tickets/ticket";

export default function TicketArticle({
    ticketData: t,
}: {
    ticketData: Ticket;
}): React.JSX.Element {
    return (
        <article className={styles.article}>
            <header>
                <h3>
                    <a href={`tickets/details/${t.ticket_id}`}>{t.title}</a>
                </h3>
                <strong
                    className={(function () {
                        switch (t.status) {
                            case "closed":
                                return styles.done;
                            case "in_progress":
                                return styles.inProg;
                            case "open":
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
