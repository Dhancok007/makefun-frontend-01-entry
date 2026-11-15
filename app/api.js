const cache = new Map();
const pending = new Map();
export async function api(path) {
  if (pending.has(path)) return pending.get(path);
  const job = (async () => {
    const old = cache.get(path);
    const response = await fetch('https://make.fun/api/' + path, {headers: old?.etag ? {'If-None-Match': old.etag} : {}});
    if (response.status === 304 && old) return old.data;
    if (!response.ok) throw new Error(`API ${response.status}: could not load this view`);
    const data = await response.json();
    cache.set(path, {data, etag: response.headers.get('etag')});
    return data;
  })();
  pending.set(path, job);
  try { return await job; } finally { pending.delete(path); }
}
export const list = data => Array.isArray(data) ? data : data.items || data.entries || data.competitions || [];
