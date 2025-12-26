import { cy } from "@/utils/cy";
import { type Database } from "@/utils/models/supabase";
import { $authStore } from "@clerk/astro/client";
import { useStore } from "@nanostores/react";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { Suspense, lazy } from "react";
import queryFn from "./queryFn";
import TicketArticle from "./ticketArticle/TicketArticle";
import { DisclosureGroup, Disclosure } from "@/components/ui/Disclosure";

const CreateTicketDialog = lazy(function () {
    return import("./createTicketDialog/CreateTicketDialog.tsx");
});

function TicketList(): React.JSX.Element {
    const { userId, orgId } = useStore($authStore);
    const { data, isLoading, isError, error } = useQuery<
        Database["public"]["Functions"]["get_tickets"]["Returns"]
    >({
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
        <DisclosureGroup className="flex-col-center gap-2.5">
            {data.map(function (t) {
                console.log({ t });
                return (
                    <Disclosure
                        key={t.ticket_id}
                        className="w-full rounded-lg bg-drac-selection p-2.5"
                        isDisabled={!t.body}
                    >
                        <TicketArticle ticketData={t} />
                    </Disclosure>
                );
            })}
        </DisclosureGroup>
    );
}

export default function TicketListWrapper(): React.JSX.Element {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <section
                {...cy("ticketList-section")}
                className="flex-col-start min-h-[30rem] gap-4 rounded-lg
                    border-4 border-drac-selection p-2.5 sm:max-w-96"
            >
                <div className="flex w-full flex-row items-center justify-end">
                    <Suspense fallback={<p>loading..</p>}>
                        <CreateTicketDialog />
                    </Suspense>
                </div>
                <TicketList />
            </section>
        </QueryClientProvider>
    );
}
