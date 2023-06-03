export type APIResponse<T> = {
  code: number;
  message: string | string[] | null;
  data: T | null;
};
