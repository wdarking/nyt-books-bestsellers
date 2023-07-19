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

export function useBooksByListQuery(listSlug: string) {
  return useQuery({
    queryKey: ["books", listSlug],
    queryFn: () => fetchBooksByList(listSlug),
  });
}

export function useBooksByDateQuery(listSlug: string, date = "current") {
  return useQuery({
    queryKey: ["books", listSlug, date],
    queryFn: () => fetchListByDate(listSlug, date),
  });
}

export function useBooksHistoryQuery(isbn: string) {
  return useQuery({
    queryKey: ["book-history", isbn],
    queryFn: () => fetchBookHistory(isbn),
  });
}
