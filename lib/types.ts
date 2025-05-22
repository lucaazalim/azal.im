export type PaginatedRequest = {
  cursor: number;
  limit: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  nextCursor?: number;
  hasMore: boolean;
};
