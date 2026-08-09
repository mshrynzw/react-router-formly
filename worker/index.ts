/**
 * Cloudflare Worker entry.
 * Static assets and SPA fallback are handled by Wrangler assets configuration.
 * MVP does not expose application APIs from the Worker.
 */
export default {
  fetch() {
    return new Response(null, { status: 404 });
  },
} satisfies ExportedHandler<Env>;
