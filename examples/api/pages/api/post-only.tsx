export default async function postOnly(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', {
      status: 405,
      headers: { Allow: 'POST' },
    });
  }

  let body = null;

  try {
    const contentType = req.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      body = await req.json();
    } else if (req.body) {
      body = await req.text();
    }
  } catch (_) {
    // Ignore parsing errors, keep body as null
  }

  return Response.json({ received: body });
}
