import { TanStackDevtools } from "@tanstack/react-devtools";
import { FormDevtoolsPlugin } from "@tanstack/react-form-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Suspense, lazy } from "react";

const FormSection = lazy(() => import("./form/features/formSection"));

export default function CreateTicketWrapper(): React.JSX.Element {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <Suspense fallback={<p>loading...</p>}>
                <FormSection />
            </Suspense>
            <TanStackDevtools plugins={[FormDevtoolsPlugin()]} />
        </QueryClientProvider>
    );
}
