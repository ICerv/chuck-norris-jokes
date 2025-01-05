export const calculateIsSearchQuery = (query?: string, total?: number) => {
  return !!query && !!total && total > 1;
};
