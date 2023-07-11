import { useState } from "react";
import { useListCategories } from "../../services/books-api";

export function CategoryList({
  setSelectedList,
}: {
  setSelectedList: (slug: string) => void;
}) {
  const { data, isLoading, isError } = useListCategories();
  const [filter, setFilter] = useState("");
  const filteredData =
    data?.results.filter((result) =>
      result.display_name
        .toLocaleLowerCase()
        .includes(filter.toLocaleLowerCase()),
    ) ?? [];

  function selectList(listSlug: string) {
    setSelectedList(listSlug);
    setFilter("");
  }

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    return "Something went wrong";
  }

  return (
    <div className="relative">
      <input
        className="w-full text-base px-3 py-2 border-2 rounded-md border-slate-300 text-slate-900 focus:shadow-none"
        onChange={(e) => setFilter(e.currentTarget.value)}
        value={filter}
        placeholder="Search list..."
        type="text"
      />
      {!!filter.length && (
        <ul className="absolute left-0 w-full bg-white shadow-2xl border p-3 z-10 overflow-y-auto min-h-[2rem] max-h-[50vh]">
          {filteredData.length ? (
            filteredData.map((list) => (
              <li
                key={list.list_name_encoded}
                onClick={() => {
                  selectList(list.list_name_encoded);
                }}
                className="p-3 cursor-pointer hover:bg-blue-50 rounded"
              >
                {list.display_name}
              </li>
            ))
          ) : (
            <li>No results.</li>
          )}
        </ul>
      )}
    </div>
  );
}
