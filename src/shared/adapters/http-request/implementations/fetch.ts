import qs from 'qs';

import { THTTPRequest, THttpRequestOptions } from '../types';

function FetchHTTPRequestSingleton(): THTTPRequest {
  function formatUrl(url: string, params?: Record<string, unknown>): string {
    if (!params) return url;
    const sanitizedParams = Object.fromEntries(
      Object.entries(params).filter(([, value]) => value != null)
    );
    const queryString = qs.stringify(sanitizedParams);
    return `${url}?${queryString}`;
  }

  async function fetchRequest(
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
    url: string,
    options: THttpRequestOptions = {},
    body?: BodyInit
  ): Promise<Response> {
    if (body) {
      options.headers = {
        ...options?.headers,
        'Content-Type': 'application/json',
      };
    }

    const response = await fetch(url, {
      method,
      body: body,
      headers: options?.headers,
      signal: options?.signal,
      credentials: options?.withCredentials ? 'include' : 'same-origin',
      cache: options?.cache,
      next: options?.next,
      mode: options?.mode,
    });
    return response;
  }

  async function requestWithResponseBody<T>(
    method: 'GET' | 'POST' | 'PATCH' | 'PUT',
    url: string,
    options?: THttpRequestOptions,
    body?: BodyInit
  ): Promise<T> {
    const formattedUrl = formatUrl(url, options?.params);
    const startTime = performance.now();

    const response = await fetchRequest(method, formattedUrl, options, body);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const endTime = performance.now();
    console.log(
      `HTTP request for ${method} in ${formattedUrl} took ${endTime - startTime} milliseconds`
    );
    return data;
  }

  async function requestWithoutResponseBody(
    method: 'POST' | 'PATCH' | 'PUT' | 'DELETE',
    url: string,
    options?: THttpRequestOptions,
    body?: BodyInit
  ): Promise<void> {
    const formattedUrl = formatUrl(url, options?.params);
    const startTime = performance.now();

    const response = await fetchRequest(method, formattedUrl, options, body);

    const endTime = performance.now();
    console.log(
      `HTTP request for ${method} in ${formattedUrl} took ${endTime - startTime} milliseconds`
    );

    if (!response.ok) throw new Error('failed to send data');
  }

  async function get<T>(url: string, options?: THttpRequestOptions): Promise<T> {
    return await requestWithResponseBody<T>('GET', url, options);
  }

  async function post<T>(url: string, body: BodyInit, options?: THttpRequestOptions): Promise<T> {
    return await requestWithResponseBody<T>('POST', url, options, body);
  }

  async function patch<T>(url: string, body: BodyInit, options?: THttpRequestOptions): Promise<T> {
    return await requestWithResponseBody<T>('PATCH', url, options, body);
  }

  async function put<T>(url: string, body: BodyInit, options?: THttpRequestOptions): Promise<T> {
    return await requestWithResponseBody<T>('PUT', url, options, body);
  }

  async function remove(url: string, options?: THttpRequestOptions): Promise<void> {
    return await requestWithoutResponseBody('DELETE', url, options);
  }

  async function postWithoutResponse(
    url: string,
    body: BodyInit,
    options?: THttpRequestOptions
  ): Promise<void> {
    return await requestWithoutResponseBody('POST', url, options, body);
  }

  async function patchWithoutResponse(
    url: string,
    body: BodyInit,
    options?: THttpRequestOptions
  ): Promise<void> {
    return await requestWithoutResponseBody('PATCH', url, options, body);
  }

  async function putWithoutResponse(
    url: string,
    body: BodyInit,
    options?: THttpRequestOptions
  ): Promise<void> {
    return await requestWithoutResponseBody('PUT', url, options, body);
  }

  return {
    get,
    post,
    patch,
    put,
    remove,
    postWithoutResponse,
    patchWithoutResponse,
    putWithoutResponse,
  };
}

export const FetchHTTPRequest = FetchHTTPRequestSingleton();
