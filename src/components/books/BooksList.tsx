import { useBooksByDateQuery } from "../../hooks/useBooksQuery";
import { Book } from "./Book";

export function BooksList({ listSlug }: { listSlug: string }) {
  const { data, isLoading, isError } = useBooksByDateQuery(listSlug);

  if (isLoading) {
    return <ListSkeleton count={5} />;
  }

  if (isError) {
    return "Error fetching books.";
  }

  return (
    <>
      <div className="mb-3 md:mb-5">
        <h1 className="text-2xl font-bold ">{data.results.display_name}</h1>
        <p className="text-slate-500">Updated {data.results.updated}</p>
      </div>
      <ul className="grid grid-cols-1 auto-rows-max gap-3 md:gap-4">
        {data.results.books.map((book) => (
          <li key={book.primary_isbn13}>
            <Book listName={data.results.display_name} book={book} />
          </li>
        ))}
      </ul>
    </>
  );
}

export function ListSkeleton({ count = 1 }: { count: number }) {
  return (
    <ul className="space-y-3 md:space-y-5">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-slate-200 w-full h-20 md:h-28 rounded animate-pulse"
        ></div>
      ))}
    </ul>
  );
}
