import { cy } from "@/utils/cy";
import type { Database } from "@/utils/models/supabase";
import { $authStore } from "@clerk/astro/client";
import { useStore } from "@nanostores/react";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import queryFn, { type TicketQueryKey } from "./queryFn";

function VersionList({ id }: { id: string }): React.JSX.Element {
    const { userId, orgId } = useStore($authStore);
    const { data, isLoading, isError, error } = useQuery<
        Database["public"]["Functions"]["get_ticket"]["Returns"]
    >({
        queryKey: [
            "get",
            "ticket",
            { id },
            {
                userId,
                orgId,
            },
        ] as const satisfies TicketQueryKey,
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
            {data.map(function (t) {
                console.log({ t });
                return (
                    <li
                        key={t.ticket_content_id}
                        className="w-full rounded-lg bg-drac-selection p-2.5"
                    >
                        hoho
                    </li>
                );
            })}
        </ul>
    );
}

export default function VersionListWrapper({
    id,
}: {
    id: string;
}): React.JSX.Element {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <section
                {...cy("versionList-section")}
                className="flex-col-start min-h-[30rem] gap-4 rounded-lg
                    border-4 border-drac-selection p-2.5 sm:max-w-96"
            >
                <VersionList id={id} />
            </section>
        </QueryClientProvider>
    );
}
