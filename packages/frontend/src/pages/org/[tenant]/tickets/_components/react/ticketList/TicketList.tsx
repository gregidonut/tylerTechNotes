import { cy } from "@/utils/cy";
import { $authStore } from "@clerk/astro/client";
import { useStore } from "@nanostores/react";
import {
    QueryClient,
    QueryClientProvider,
    useQueries,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { Suspense, lazy } from "react";
import { getLink, getTickets } from "./queryFns.ts";
import TicketArticle from "./ticketArticle/TicketArticle";
import { DisclosureGroup, Disclosure } from "@/components/ui/Disclosure";
import { Heading } from "react-aria-components";

const CreateTicketDialog = lazy(function () {
    return import("./createTicketDialog/CreateTicketDialog.tsx");
});

function TicketList(): React.JSX.Element {
    const { userId, orgId } = useStore($authStore);
    const [
        {
            data: tData,
            isLoading: tIsLoading,
            isError: tIsError,
            error: tQueryError,
        },
        {
            data: ltData,
            isLoading: ltIsLoading,
            isError: ltIsError,
            error: ltQueryError,
        },
    ] = useQueries({
        queries: [
            {
                queryKey: [
                    "get",
                    "tickets",
                    {
                        userId,
                        orgId,
                    },
                ],
                queryFn: getTickets,
            },
            {
                queryKey: [
                    "get",
                    "linkTemplate",
                    {
                        userId,
                        orgId,
                    },
                    "zendesk ticket template",
                ],
                queryFn: getLink,
            },
        ],
    });
    if (tIsLoading || ltIsLoading) {
        return <p>loading...</p>;
    }
    if (tIsError) {
        return <p>{tQueryError.message}</p>;
    }
    if (ltIsError) {
        return <p>{ltQueryError.message}</p>;
    }
    if (!tData || tData.length === 0) {
        return <p>no tickets yet..</p>;
    }
    return (
        <DisclosureGroup className="flex-col-center gap-2.5">
            {tData.map(function (t) {
                return (
                    <Disclosure
                        key={t.ticket_id}
                        className="w-full rounded-lg bg-drac-selection p-1.5"
                        isDisabled={!t.body}
                    >
                        <TicketArticle
                            ticketData={t}
                            linkTemplateBaseUrl={
                                ltData ? ltData.base_url : undefined
                            }
                        />
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
                <header
                    className="flex w-full flex-row items-center justify-end"
                >
                    <Heading
                        level={3}
                        className="pl-2 text-xl font-bold underline"
                    >
                        Overview
                    </Heading>
                    <Suspense fallback={<p>loading..</p>}>
                        <CreateTicketDialog />
                    </Suspense>
                </header>
                <TicketList />
            </section>
        </QueryClientProvider>
    );
}
