// server/index.ts

export async function GetRoute(
  routeTable: IRouteTable,
  relativePath: string,
  method: Method
): Promise<Response | undefined> {
  const route = routeTable.getRoute(relativePath, method);
  if (!route) return undefined;
  // no need for `await` + `return`; just return the promise
  return route.callback();
}

export enum Method {
  PUT = 'PUT',
  POST = 'POST',
  GET = 'GET',
  DELETE = 'DELETE',
}

export interface IRoute {
  relativePath: string;      // e.g. "/api/health"
  method: Method;            // e.g. Method.GET
  callback(): Promise<Response>;
}

export interface IRouteTable {
  routes: Map<string, IRoute>;
  getRoute(path: string, method: Method): IRoute | undefined;
}

export interface IRouteTableBuilder {
  add(route: IRoute): IRouteTableBuilder;
  build(): IRouteTable;
}

// -----------------------
// Implementation
// -----------------------

function normalisePath(p: string): string {
  if (!p.startsWith('/')) p = '/' + p;
  // strip duplicate slashes (// -> /), drop trailing slash (except root)
  p = p.replace(/\/{2,}/g, '/');
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  return p;
}

function keyFor(path: string, method: Method): string {
  return `${method} ${normalisePath(path)}`; // e.g. "GET /api/health"
}

class RouteTable implements IRouteTable {
  public routes = new Map<string, IRoute>();

  constructor(routes: Map<string, IRoute>) {
    this.routes = routes;
  }

  getRoute(path: string, method: Method): IRoute | undefined {
    return this.routes.get(keyFor(path, method));
  }
}

export class RouteTableBuilder implements IRouteTableBuilder {
  private routes = new Map<string, IRoute>();

  add(route: IRoute): IRouteTableBuilder {
    const k = keyFor(route.relativePath, route.method);
    if (this.routes.has(k)) {
      throw new Error(`Route already registered: ${k}`);
    }
    // store a normalised copy to avoid surprises
    this.routes.set(k, {
      ...route,
      relativePath: normalisePath(route.relativePath),
    });
    return this;
  }

  build(): IRouteTable {
    return new RouteTable(this.routes);
  }
}

// -----------------------
// Example usage
// -----------------------

async function healthHandler(): Promise<Response> {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
}

const table = new RouteTableBuilder()
  .add({ relativePath: '/api/health', method: Method.GET, callback: healthHandler })
  .add({ relativePath: 'api/echo', method: Method.POST, callback: async () => new Response('echo') })
  .build();

// Somewhere in your request pipeline:
export async function handleRequest(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const method = req.method as Method; // if you’re sure it’s one of the enum values
  const res = await GetRoute(table, url.pathname, method);
  return res ?? new Response('Not Found', { status: 404 });
}
