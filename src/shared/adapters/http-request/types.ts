export type THttpRequestOptions = {
  params?: Record<string, unknown>;
  headers?: HeadersInit;
  signal?: AbortSignal;
  withCredentials?: boolean;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  mode?: RequestMode;
};

export type THTTPRequest = {
  get<T>(url: string, options?: THttpRequestOptions): Promise<T>;
  post<T>(url: string, body: BodyInit, options?: THttpRequestOptions): Promise<T>;
  patch<T>(url: string, body: BodyInit, options?: THttpRequestOptions): Promise<T>;
  put<T>(url: string, body: BodyInit, options?: THttpRequestOptions): Promise<T>;
  remove(url: string, options?: THttpRequestOptions): Promise<void>;
  postWithoutResponse(url: string, body: BodyInit, options?: THttpRequestOptions): Promise<void>;
  patchWithoutResponse(url: string, body: BodyInit, options?: THttpRequestOptions): Promise<void>;
  putWithoutResponse(url: string, body: BodyInit, options?: THttpRequestOptions): Promise<void>;
};
