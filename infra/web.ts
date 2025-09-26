import {
  ASTRO_APP_DOMAIN,
  FE_ACM_CERT_ARN,
  clerkPublic,
  clerkSecret,
  supabaseKey,
} from "./secrets";

export const frontend = new sst.aws.Astro("Frontend", {
  path: "packages/frontend",
  link: [ASTRO_APP_DOMAIN, FE_ACM_CERT_ARN, supabaseKey],
  environment: {
    SST_STAGE: $app.stage,
    ASTRO_SITE: `https://${ASTRO_APP_DOMAIN.value}`,
    PUBLIC_CLERK_PUBLISHABLE_KEY: clerkPublic.value,
    CLERK_SECRET_KEY: clerkSecret.value,
    CLERK_SIGN_IN_URL: "/sign-in",
    // ASTRO_API_URL: api.url,
    ...($app.stage === "dev" ? { SUPABASE_URL: "http://127.0.0.1:54321" } : {}),
    SUPABASE_KEY: supabaseKey.value,
  },
  domain: {
    name: ASTRO_APP_DOMAIN.value,
    dns: false,
    cert: FE_ACM_CERT_ARN.value,
  },
});
