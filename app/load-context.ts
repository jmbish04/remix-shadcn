import type { AppLoadContext as RemixAppLoadContext } from "@remix-run/cloudflare";

declare module "@remix-run/cloudflare" {
  interface AppLoadContext extends RemixAppLoadContext {
    cloudflare: {
      env: {
        DB: D1Database;
      };
    };
  }
}
