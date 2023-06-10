export type APIResponse<T> = {
  code: number;
  timestamp: number;
  message?: string | null;
  content?: T | null;
};
