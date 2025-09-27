// @ts-check
import { defineConfig } from "astro/config";
import compressor from "astro-compressor";
import aws from "astro-sst";
import clerk from "@clerk/astro";
import { shadesOfPurple } from "@clerk/themes";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
    site: import.meta.env.ASTRO_SITE,
    integrations: [
        compressor(),
        clerk({
            appearance: {
                baseTheme: [shadesOfPurple],
            },
            signInForceRedirectUrl: "/tickets",
        }),
        react(),
    ],
    output: "server",
    adapter: aws({
        responseMode: "stream",
    }),
});

