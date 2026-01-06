export function parse(queryStr = window?.location?.search) {
  const query = new URLSearchParams(queryStr);
  return Object.fromEntries(query.entries());
}

export function decode(str: string) {
  try {
    return atob(str);
  } catch (_e) {
    return undefined;
  }
}
const strignify = (params: Record<string, unknown>) => {
  const arr: string[] = [];
  for (const [k, v] of Object.entries(params)) {
    if (Array.isArray(v)) {
      for (const val of v) {
        arr.push(`${k}=${val}`);
      }
      continue;
    }
    arr.push(`${k}=${v}`);
  }
  return arr.join('&');
};
export const QUERY = {
  parse,
  decode,
  strignify,
};
