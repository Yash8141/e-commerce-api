"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildSortQuery = exports.buildSearchQuery = void 0;
const buildSearchQuery = (search, searchBy = 'title') => {
  if (!search) return {};
  const validSearchFields = ["title", "category"];
  const searchField = validSearchFields.includes(searchBy) ? searchBy : "title";
  return {
    [searchField]: {
      $regex: search,
      $options: "i"
    }
  };
};
exports.buildSearchQuery = buildSearchQuery;
const buildSortQuery = (sortDir = "desc", sortBy = "createdAt") => {
  const validSortDirections = ["asc", "desc"];
  const validSortFields = ["title", "price", "category", "createdAt", "updateAt"];
  const sortDirection = validSortDirections.includes(sortDir.toLowerCase()) ? sortDir.toLowerCase() : "desc";
  const field = validSortFields.includes(sortBy) ? sortBy : "createdAt";
  return {
    [field]: sortDirection === "asc" ? 1 : -1
  };
};
exports.buildSortQuery = buildSortQuery;