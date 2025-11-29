export const buildSearchQuery = (search, searchBy = 'title') => {
  if (!search) return {};

  const validSearchFields = ["title","category"];
  const searchField = validSearchFields.includes(searchBy) ? searchBy : "title";
    console.log('search field',searchField)
  return {
    [searchField]: { $regex: search, $options: "i" },
  };
};

export const buildSortQuery = (sortDir = "desc", sortBy = "createdAt") => {
  const validSortDirections = ["asc", "desc"];
  const validSortFields = [
    "title",
    "price",
    "category",
    "createdAt",
    "updateAt",
  ];

  const sortDirection = validSortDirections.includes(sortDir.toLowerCase())
    ? sortDir.toLowerCase()
    : "desc";
  const field = validSortFields.includes(sortBy) ? sortBy : "createdAt";

  return {
    [field]: sortDirection === "asc" ? 1 : -1,
  };
};
