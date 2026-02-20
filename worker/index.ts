interface WorkerEnv extends Env {
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const url = new URL(request.url);

    // CORS headers for local dev
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // GET /api/users — list all users
    if (url.pathname === '/api/users' && request.method === 'GET') {
      const { results } = await env.DB.prepare(
        'SELECT * FROM users ORDER BY created_at DESC'
      ).all();
      return Response.json(results, { headers: corsHeaders });
    }

    // POST /api/users — create a user
    if (url.pathname === '/api/users' && request.method === 'POST') {
      const body = await request.json<{ name: string; hobbies: string }>();
      if (!body.name || !body.hobbies) {
        return Response.json(
          { error: 'name and hobbies are required' },
          { status: 400, headers: corsHeaders }
        );
      }
      const result = await env.DB.prepare(
        'INSERT INTO users (name, hobbies) VALUES (?, ?) RETURNING *'
      )
        .bind(body.name, body.hobbies)
        .first();
      return Response.json(result, { status: 201, headers: corsHeaders });
    }

    // DELETE /api/users/:id — delete a user
    const deleteMatch = url.pathname.match(/^\/api\/users\/(\d+)$/);
    if (deleteMatch && request.method === 'DELETE') {
      const id = deleteMatch[1];
      await env.DB.prepare('DELETE FROM users WHERE id = ?').bind(id).run();
      return Response.json({ success: true }, { headers: corsHeaders });
    }

    return new Response(null, { status: 404 });
  },
} satisfies ExportedHandler<WorkerEnv>;
