import { useBooksByList } from "../../services/books-api";
import { Book } from "./Book";

export function BooksList({ listSlug }: { listSlug: string }) {
  const { data, isLoading, isError } = useBooksByList(listSlug);

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    return "Error fetching books.";
  }

  return (
    <ul className="grid grid-cols-1 auto-rows-max gap-3 md:gap-4">
      {data.results.map((bestseller) => (
        <li key={bestseller.book_details[0].primary_isbn13}>
          <Book {...bestseller} />
        </li>
      ))}
    </ul>
  );
}
