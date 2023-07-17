import { useQuery } from "@tanstack/react-query";
import {
  fetchBookHistory,
  fetchBooksByList,
  fetchListByDate,
  fetchListCategories,
} from "../services/booksApi";

export function useListCategoriesQuery() {
  return useQuery({
    queryKey: ["list-names"],
    queryFn: fetchListCategories,
  });
}

export function useBooksByListQuery(slug: string) {
  return useQuery({
    queryKey: ["books", slug],
    queryFn: () => fetchBooksByList(slug),
  });
}

export function useBooksByDateQuery(slug: string) {
  const now = new Date();
  const latestDate = now.toISOString().split("T")[0];
  return useQuery({
    queryKey: ["books", slug, latestDate],
    queryFn: () => fetchListByDate(slug, latestDate),
  });
}

export function useBooksHistoryQuery(isbn: string) {
  return useQuery({
    queryKey: ["book-history", isbn],
    queryFn: () => fetchBookHistory(isbn),
  });
}
