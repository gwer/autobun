import { MatchedRoute } from 'bun';

export default async function handler(req: Request, matchRoute: MatchedRoute) {
  const name = matchRoute.params.name || 'world';
  const foo = matchRoute.query.foo || '';

  return new Response(`Hello, ${name}! ${foo}`.trim(), {
    headers: { 'Content-Type': 'text/plain' },
  });
}
