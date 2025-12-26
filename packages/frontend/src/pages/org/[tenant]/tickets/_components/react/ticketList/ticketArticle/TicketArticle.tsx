import { type Database } from "@/utils/models/supabase";
import React from "react";
import { DisclosureHeader, DisclosurePanel } from "@/components/ui/Disclosure";
import { Link } from "react-aria-components";

export default function TicketArticle({
    ticketData: t,
    linkTemplateBaseUrl,
}: {
    ticketData: Database["public"]["Functions"]["get_tickets"]["Returns"][number];
    linkTemplateBaseUrl: string | undefined;
}): React.JSX.Element {
    return (
        <article>
            <DisclosureHeader>
                {linkTemplateBaseUrl ? (
                    <Link href={`${linkTemplateBaseUrl}${t.zendesk_id}`}>
                        #{t.zendesk_id}
                    </Link>
                ) : (
                    <span>#{t.zendesk_id}</span>
                )}
                <Link
                    href={`tickets/details/${t.ticket_id}`}
                    className="line-clam-1 max-w-48 truncate"
                >
                    details
                </Link>
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
            </DisclosureHeader>
            {t.body ? <DisclosurePanel>{t.body}</DisclosurePanel> : null}
        </article>
    );
}
