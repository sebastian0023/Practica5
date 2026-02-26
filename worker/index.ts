export default {
  async fetch(_request: Request, _env: Env): Promise<Response> {
    return new Response(null, { status: 404 });
  },
} satisfies ExportedHandler<Env>;
