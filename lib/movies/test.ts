type OrdemCompraFilterDto = {
  id?: string;
  fornecedorId?: string;
  status?: string;
};

type OrdemCompraCreateDto = {
  id?: string;
  fornecedorId: string;
  status: string;
  data: string;
  valor: number;
};

type OrdemCompraResponseDto = {
  id: string;
  fornecedorId: string;
  status: string;
  data: string;
  valor: number;
};

// ---

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type EndpointDefinitions = {
  "/ordem-compras": {
    "GET": {
      params: OrdemCompraFilterDto;
      body: undefined;
      response: OrdemCompraResponseDto[];
    };
    "POST": {
      params: undefined;
      body: OrdemCompraCreateDto;
      response: OrdemCompraResponseDto;
    };
  };
};

type Endpoint = keyof EndpointDefinitions;

type MethodFor<E extends Endpoint> = keyof EndpointDefinitions[E];

type ParamEntry = [string, string | number | boolean];

type ParamsFor<
  E extends Endpoint,
  M extends MethodFor<E>,
> = M extends keyof EndpointDefinitions[E]
  ? EndpointDefinitions[E][M] extends { params: ParamEntry[] }
    ? EndpointDefinitions[E][M]["params"]
    : never
  : never;

type BodyFor<
  E extends Endpoint,
  M extends MethodFor<E>,
> = M extends keyof EndpointDefinitions[E]
  ? EndpointDefinitions[E][M] extends { body: ParamEntry[] }
    ? EndpointDefinitions[E][M]["body"]
    : never
  : never;

type ResponseFor<
  E extends Endpoint,
  M extends MethodFor<E>,
> = M extends keyof EndpointDefinitions[E]
  ? EndpointDefinitions[E][M] extends { response: any }
    ? EndpointDefinitions[E][M]["response"]
    : never
  : never;

async function genericRequest<E extends Endpoint, M extends MethodFor<E>>(
  endpoint: E,
  method: M,
  options: {
    params: ParamsFor<E, M>;
    body: BodyFor<E, M>;
  },
): Promise<ResponseFor<E, M>> {
  const url = new URL(endpoint, "https://api.noventa.com.br");

  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) =>
      url.searchParams.append(key, String(value)),
    );
  }

  const response = await fetch(url.toString(), {
    method: method, // Não sei como resolver sem usar "as"
    headers: {
      "Content-Type": "application/json",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  return response.json();
}
