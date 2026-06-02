import axios from "axios";

export const engleshPlusBaseApiLocal = "http://localhost:8081";
export const engleshPlusBaseApiProduction = "https://engleshplus-api.vercel.app";

export const engleshPlusBaseApi =
  import.meta.env.VITE_ENGLESHPLUS_API_URL ||
  (import.meta.env.DEV ? engleshPlusBaseApiLocal : engleshPlusBaseApiProduction);

export const engleshPlusApi = axios.create({
  baseURL: engleshPlusBaseApiProduction,
});

const CACHE_TTL = {
  short: 60 * 1000,
  medium: 5 * 60 * 1000,
  long: 10 * 60 * 1000,
};

type CacheEntry<T> = {
  data?: T;
  promise?: Promise<T>;
  expiresAt: number;
};

const apiCache = new Map<string, CacheEntry<unknown>>();

function authConfig(token: string) {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
}

function asArray<T>(data: T | T[] | null | undefined): T[] {
  if (!data) return [];
  return Array.isArray(data) ? data : [data];
}

function logAndReturn<T>(fallback: T) {
  return (error: unknown) => {
    console.error(error);
    return fallback;
  };
}

function getCachedRequest<T>(
  cacheKey: string,
  request: () => Promise<T>,
  ttlMs = CACHE_TTL.medium,
) {
  const now = Date.now();
  const cached = apiCache.get(cacheKey) as CacheEntry<T> | undefined;

  if (cached && cached.expiresAt > now) {
    if (cached.promise) return cached.promise;
    return Promise.resolve(cached.data as T);
  }

  const promise = request()
    .then((data) => {
      apiCache.set(cacheKey, {
        data,
        expiresAt: Date.now() + ttlMs,
      });

      return data;
    })
    .catch((error) => {
      apiCache.delete(cacheKey);
      throw error;
    });

  apiCache.set(cacheKey, {
    promise,
    expiresAt: now + ttlMs,
  });

  return promise;
}

function invalidateCache(prefixes: string[]) {
  for (const key of apiCache.keys()) {
    if (prefixes.some((prefix) => key.startsWith(prefix))) {
      apiCache.delete(key);
    }
  }
}

export function clearEnglishPlusApiCache() {
  apiCache.clear();
}

export async function PostText(data: unknown, userId: string, token: string) {
  const post = engleshPlusApi
    .post("/api/texts", data, authConfig(token))
    .then((response) => {
      invalidateCache(["texts:", "text:"]);
      return response.data;
    })
    .catch(logAndReturn(null));

  return await post;
}

export async function PutText(textId: string, data: unknown, token: string) {
  const put = engleshPlusApi
    .put(`/api/texts/${textId}`, data, authConfig(token))
    .then((response) => {
      invalidateCache(["texts:", `text:${textId}`]);
      return response.data;
    })
    .catch(logAndReturn(null));

  return await put;
}

export async function getSingleUser(userId: string, token: string) {
  const get = getCachedRequest(
    `user:${userId}`,
    () =>
      engleshPlusApi
        .get(`/api/user/${userId}`, authConfig(token))
        .then((response) => response.data),
    CACHE_TTL.medium,
  );

  return await get;
}

export async function postLogin(data: unknown) {
  return engleshPlusApi
    .post("/auth/login", data)
    .then((response) => response)
    .catch(logAndReturn(null));
}

export async function postRegister(data: unknown) {
  return engleshPlusApi
    .post("/auth/register", data)
    .then((response) => response)
    .catch(logAndReturn(null));
}

export async function getTexts({ page = 1, limit = 5 }) {
  const get = getCachedRequest(
    `texts:${page}:${limit}`,
    () =>
      engleshPlusApi
        .get(`/api/texts/?page=${page}&limit=${limit}`)
        .then((response) => response.data),
    CACHE_TTL.medium,
  )
    .catch(logAndReturn({ page, limit, total: 0, totalPages: 0, data: [] }));

  return await get;
}

export async function getSingleText(textid?: string) {
  if (!textid) return [];

  const get = getCachedRequest(
    `text:${textid}`,
    () =>
      engleshPlusApi
        .get(`/api/texts/${textid}`)
        .then((response) => asArray(response.data)),
    CACHE_TTL.long,
  )
    .catch(logAndReturn([]));

  return await get;
}

export async function postText(data: unknown, token: string) {
  const post = engleshPlusApi
    .post("/api/texts", data, authConfig(token))
    .then((response) => {
      invalidateCache(["texts:", "text:"]);
      return response;
    });

  return await post;
}

export async function deleteText(textid: string, token: string) {
  const del = engleshPlusApi
    .delete(`/api/texts/${textid}`, authConfig(token))
    .then((response) => {
      invalidateCache(["texts:", `text:${textid}`]);
      return response;
    });

  return await del;
}

export async function getMemorizes(token: string) {
  const get = getCachedRequest(
    "memorizes:all",
    () =>
      engleshPlusApi
        .get("/api/memorize", authConfig(token))
        .then((response) => asArray(response.data)),
    CACHE_TTL.medium,
  )
    .catch(logAndReturn([]));

  return await get;
}

export async function getOneEspecific(memoid: string | undefined, token: string) {
  if (!memoid) return [];

  const get = getCachedRequest(
    `memo:${memoid}`,
    () =>
      engleshPlusApi
        .get(`/api/memorize/OneEspecific/${memoid}`, authConfig(token))
        .then((response) => asArray(response.data)),
    CACHE_TTL.medium,
  )
    .catch(logAndReturn([]));

  return await get;
}

export async function getUserMemorizes(userId: string, token: string) {
  if (!userId || !token) return [];

  const get = getCachedRequest(
    `user-memorizes:${userId}`,
    () =>
      engleshPlusApi
        .get(`/api/memorize/UserMemorizes/${userId}`, authConfig(token))
        .then((response) => asArray(response.data)),
    CACHE_TTL.short,
  )
    .catch(logAndReturn([]));

  return await get;
}

export async function PutMemorize(userId: string, data: unknown, token: string) {
  const put = engleshPlusApi
    .put(`/api/memorize/${userId}`, data, authConfig(token))
    .then((response) => {
      invalidateCache(["memorizes:", "memo:", `user-memorizes:${userId}`]);
      return response.data;
    })
    .catch(logAndReturn(null));

  return await put;
}

export async function PostMemorize(data: unknown, token: string) {
  const post = engleshPlusApi
    .post("/api/memorize", data, authConfig(token))
    .then((response) => {
      invalidateCache(["memorizes:", "memo:", "user-memorizes:"]);
      return response.data;
    })
    .catch(logAndReturn(null));

  return await post;
}

export async function DeletMemorize(memoId: string, token: string) {
  const post = engleshPlusApi
    .delete(`/api/memorize/${memoId}`, authConfig(token))
    .then((response) => {
      invalidateCache(["memorizes:", `memo:${memoId}`, "user-memorizes:"]);
      return response.data;
    })
    .catch(logAndReturn(null));

  return await post;
}
