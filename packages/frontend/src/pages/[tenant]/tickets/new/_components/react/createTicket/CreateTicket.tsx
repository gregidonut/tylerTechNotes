import { TanStackDevtools } from "@tanstack/react-devtools";
import { FormDevtoolsPlugin } from "@tanstack/react-form-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import FormSection from "./form/features/formSection";

export default function CreateTicketWrapper(): React.JSX.Element {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <FormSection />
            <TanStackDevtools plugins={[FormDevtoolsPlugin()]} />
        </QueryClientProvider>
    );
}
