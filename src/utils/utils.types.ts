export type AwaitedData<T extends Record<string, any | Promise<any>>> = {
  [Property in keyof T]: Awaited<T[Property]>;
};
