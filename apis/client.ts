import axios, { type AxiosError } from "axios";
import {
  type AxiosCacheInstance,
  type CacheAxiosResponse,
  type InternalCacheRequestConfig,
  setupCache,
} from "axios-cache-interceptor";

import { ENDPOINTS } from "~/constants/endpoints";
import type { NamedAPIResourceList } from "~/types/models/resource";

type ObjectValue<T> = T[keyof T];
type Endpoint = ObjectValue<typeof ENDPOINTS>;

export class BaseClient {
  private api: AxiosCacheInstance;

  constructor() {
    this.api = setupCache(
      axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );

    this.api.interceptors.request.use(
      (config: InternalCacheRequestConfig) => config,
      (error: AxiosError<string>) => Promise.reject(error),
    );

    this.api.interceptors.response.use(
      (response: CacheAxiosResponse) => response,
      (error: AxiosError<string>) => Promise.reject(error),
    );
  }

  protected async getResource<T>(
    endpoint: string,
    identifier?: string | number,
  ): Promise<T> {
    return (
      await this.api.get<T>(
        `${endpoint}/${identifier || identifier === 0 ? identifier : ""}`,
      )
    ).data;
  }

  protected async getListResource(
    endpoint: Endpoint,
    offset = 0,
    limit = 20,
  ): Promise<NamedAPIResourceList> {
    return (
      await this.api.get<NamedAPIResourceList>(
        `${endpoint}?offset=${offset}&limit=${limit}`,
      )
    ).data;
  }
}
