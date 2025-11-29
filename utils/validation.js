export const validateProductQuery = (query) => {
  const {
    page = 1,
    limit = 10,
    search,
    searchBy = "title",
    sortDir = "desc",
    sortBy = "createdAt",
  } = query;

  // Validate Pagination
  const validatedPage = Math.max(1, parseInt(page) || 1);
  const validatedLimit = Math.max(1, Math.min(50, parseInt(limit) || 10));

  // Validate search parameters
  const validSearchFields = ["title","category"];
  const validatedSearchBy = validSearchFields.includes(searchBy)
    ? searchBy
    : "title";

  // Validate sort parameter
  const validateSortDirections = ["asc", "desc"];
  const validSortFields = [
    "title",
    "price",
    "category",
    "createdAt",
    "updatedAt",
  ];

  const validatedSortDir = validateSortDirections.includes(
    sortDir.toLowerCase()
  )
    ? sortDir.toLowerCase()
    : "desc";

  const validatedSortBy = validSortFields.includes(sortBy)
    ? sortBy
    : "createdAt";

    return {
        page: validatedPage,
        limit: validatedLimit,
        search: search ? search.trim() : null,
        searchBy: validatedSearchBy,
        sortDir: validatedSortDir,
        sortBy: validatedSortBy
    }
};
