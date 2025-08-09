import type { AppLoadContext, EntryContext } from "@remix-run/cloudflare";
import { RemixServer } from "@remix-run/react";
import { renderToReadableStream } from "react-dom/server";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext
) {
  const stream = await renderToReadableStream(
    <RemixServer
      context={remixContext}
      url={request.url}
    />,
    {
      signal: request.signal,
    }
  );

  return new Response(stream, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
