type SnakeToCamel<T> = T extends Array<infer U>
  ? Array<SnakeToCamel<U>>
  : T extends object
  ? { [K in keyof T as CamelCase<string & K>]: SnakeToCamel<T[K]> }
  : T;

type CamelCase<S extends string> = S extends `${infer First}_${infer Rest}`
  ? `${Lowercase<First>}${Capitalize<CamelCase<Rest>>}`
  : S;

export const snakeToCamel = <T>(obj: T): SnakeToCamel<T> => {
  if (Array.isArray(obj)) {
    return obj.map(v => snakeToCamel(v)) as any;
  } else if (obj !== null && typeof obj == 'object') {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      return { ...acc, [camelKey]: snakeToCamel(value) as any };
    }, {}) as any;
  }
  return obj as any;
};
