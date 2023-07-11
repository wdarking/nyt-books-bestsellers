import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const baseURL = "https://api.nytimes.com/svc/books/v3/";
const apiKey = import.meta.env.VITE_API_KEY;

const api = axios.create({
  baseURL,
  params: {
    "api-key": apiKey,
  },
});

type ListNameType = {
  list_name: string;
  display_name: string;
  list_name_encoded: string;
  oldest_published_date: Date;
  newest_published_data: Date;
  updated: string;
};

type OverviewSchema<ResultType> = {
  status: string;
  copyright: string;
  num_results: number;
  results: ResultType[];
};

async function fetchListCategories(): Promise<OverviewSchema<ListNameType>> {
  const { data } = await api.get("lists/names.json");
  return data;
}

export function useListCategories() {
  return useQuery({
    queryKey: ["list-names"],
    queryFn: fetchListCategories,
    staleTime: Infinity,
  });
}

type ISBN = {
  isbn10: string;
  isbn13: string;
};

export type BookDetailsSchema = {
  title: string;
  description: string;
  contributor: string;
  author: string;
  contributor_note: string;
  price: number;
  age_group: string;
  publisher: string;
  primary_isbn13: string;
  primary_isbn10: string;
};

type ReviewSchema = {
  book_review_link: string;
  first_chapter_link: string;
  sunday_review_link: string;
  article_chapter_link: string;
};

export type BestSellerSchema = {
  list_name: string;
  display_name: string;
  bestsellers_date: string;
  published_date: string;
  rank: number;
  rank_last_week: number;
  weeks_on_list: number;
  asterisk: number;
  dagger: number;
  amazon_product_url: string;
  isbns: ISBN[];
  book_details: BookDetailsSchema[];
  reviews: ReviewSchema[];
};

async function fetchBooksByList(
  slug: string,
): Promise<OverviewSchema<BestSellerSchema>> {
  const { data } = await api.get("lists.json", {
    params: {
      list: slug,
    },
  });

  console.log(data);

  return data;
}

export function useBooksByList(slug: string) {
  return useQuery({
    queryKey: ["books", slug],
    queryFn: () => fetchBooksByList(slug),
    staleTime: Infinity,
  });
}
