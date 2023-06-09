export type APIResponse<T> = {
  code: number;
  message: string | string[] | null;
  content: T | null;
};
