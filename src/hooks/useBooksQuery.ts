import { useQuery } from "@tanstack/react-query";
import { fetchBooksByList, fetchListCategories } from "../services/booksApi";

export function useListCategoriesQuery() {
  return useQuery({
    queryKey: ["list-names"],
    queryFn: fetchListCategories,
    staleTime: Infinity,
  });
}

export function useBooksByListQuery(slug: string) {
  return useQuery({
    queryKey: ["books", slug],
    queryFn: () => fetchBooksByList(slug),
    staleTime: Infinity,
  });
}
