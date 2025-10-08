import { type Ticket } from "@/pages/api/tickets/ticket";
import { cy } from "@/utils/cy";
import { $authStore } from "@clerk/astro/client";
import { useStore } from "@nanostores/react";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import queryFn from "./queryFn";
import TicketArticle from "./ticketArticle/TicketArticle";

function TicketList(): React.JSX.Element {
    const { userId, orgId } = useStore($authStore);
    const { data, isLoading, isError, error } = useQuery<Ticket[]>({
        queryKey: [
            "get",
            "tickets",
            {
                userId,
                orgId,
            },
        ],
        queryFn,
    });
    if (isLoading) {
        return <p>loading...</p>;
    }
    if (isError) {
        return <p>{error.message}</p>;
    }
    if (!data || data.length === 0) {
        return <p>no tickets yet..</p>;
    }
    return (
        <ul className="flex-col-center gap-2.5">
            {data.map(function (t: Ticket) {
                return (
                    <li
                        key={t.ticket_id}
                        className="w-full rounded-lg bg-drac-selection p-2.5"
                    >
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
            <section
                {...cy("ticketList-section")}
                className="flex-col-start min-h-[30rem] rounded-lg border-4
                    border-drac-selection p-2.5 sm:max-w-96"
            >
                <TicketList />
            </section>
        </QueryClientProvider>
    );
}
