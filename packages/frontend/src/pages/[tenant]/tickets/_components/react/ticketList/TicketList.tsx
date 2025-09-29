import React from "react";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryFn from "./queryFn";
import styles from "./ticketList.module.css";
import TicketArticle from "./ticketArticle/TicketArticle";
import { type Ticket } from "@/pages/api/tickets/ticket";

function TicketList(): React.JSX.Element {
    const { data, isLoading, isError, error } = useQuery<Ticket[]>({
        queryKey: ["tickets"],
        queryFn,
    });
    if (isLoading) {
        return <p>loading...</p>;
    }
    if (isError) {
        return <p>{error.message}</p>;
    }
    if (!data || data.length === 0) {
        return <p>no todos yet..</p>;
    }
    return (
        <ul className={styles.todoList}>
            {data.map(function (t: Ticket) {
                return (
                    <li key={t.ticket_id}>
                        <TicketArticle ticketData={t} />
                    </li>
                );
            })}
        </ul>
    );
}

export default function PostListWrapper(): React.JSX.Element {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <section className={styles.section}>
                <TicketList />
            </section>
        </QueryClientProvider>
    );
}
