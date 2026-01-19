import {
  ASTRO_APP_DOMAIN,
  FE_ACM_CERT_ARN,
  clerkPublic,
  clerkSecret,
  supabaseKey,
  supabaseUrl,
} from "./secrets";
import { Vpc as SupabaseVPC } from "./vpc";

export const frontend = new sst.aws.Astro("Frontend", {
  path: "packages/frontend",
  link: [ASTRO_APP_DOMAIN, FE_ACM_CERT_ARN, supabaseKey, supabaseUrl],
  environment: {
    PUBLIC_APP_STAGE: $app.stage,
    ASTRO_SITE: ASTRO_APP_DOMAIN.value,
    PUBLIC_CLERK_PUBLISHABLE_KEY: clerkPublic.value,
    CLERK_SECRET_KEY: clerkSecret.value,
    PUBLIC_CLERK_SIGN_IN_URL: "/sign-in",
    SUPABASE_URL: supabaseUrl.value,
    SUPABASE_KEY: supabaseKey.value,
  },
  domain: {
    name: ASTRO_APP_DOMAIN.value,
    dns: false,
    cert: FE_ACM_CERT_ARN.value,
  },
  vpc: SupabaseVPC,
});

new awsnative.lambda.Permission("InvokePermission", {
  action: "lambda:InvokeFunction",
  functionName: frontend.nodes.server!.name,
  principal: "*",
  invokedViaFunctionUrl: true,
});
