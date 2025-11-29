export const calculatePagination = (total, page = 1, limit = 10) => {
  const currentPage = Math.max(1, parseInt(page));
  const currentLimit = Math.max(1, Math.min(50, parseInt(limit)));
  const totalPages = Math.ceil(total / currentLimit);
  const skip = (currentPage - 1) * currentLimit;

  return {
    page: currentPage,
    limit: currentLimit,
    totalPages,
    total,
    skip,
  };
};
