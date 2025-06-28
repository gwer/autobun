import { MatchedRoute } from 'bun';

export type HandleApi = (
  request: Request,
  matchRoute: MatchedRoute,
  version: number
) => Promise<Response>;

export type ApiModule = (
  request: Request,
  matchRoute: MatchedRoute
) => Promise<Response>;

async function loadModule(
  modulePath: string,
  version: number
): Promise<ApiModule> {
  return (await import(modulePath + `?v=${version}`)).default;
}

export const handleApi: HandleApi = async (request, matchRoute, version) => {
  const handler = await loadModule(matchRoute.filePath, version);

  return handler(request, matchRoute);
};
