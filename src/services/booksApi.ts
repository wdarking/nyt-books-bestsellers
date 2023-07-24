import axios from "axios";
import {
  BookHistoryResponse,
  ListByDateResponse,
  ListCategoriesResponse,
  ListResponse,
} from "./booksApiTypes";

const baseURL = "https://api.nytimes.com/svc/books/v3/";
const apiKey = import.meta.env.VITE_API_KEY;

const api = axios.create({
  baseURL,
  params: {
    "api-key": apiKey,
  },
});

export async function fetchListCategories(): ListCategoriesResponse {
  const { data } = await api.get("lists/names.json");
  return data;
}

export async function fetchBooksByList(slug: string): ListResponse {
  const { data } = await api.get("lists.json", {
    params: {
      list: slug,
    },
  });

  console.log(data);

  return data;
}

export async function fetchListByDate(
  list: string,
  date: string,
): ListByDateResponse {
  const { data } = await api.get(`lists/${date}/${list}.json`);

  console.log(data);
  return data;
}

export async function fetchBookHistory(isbn: string): BookHistoryResponse {
  const { data } = await api.get("lists/best-sellers/history.json", {
    params: {
      isbn,
    },
  });

  console.log(data);

  return data;
}
