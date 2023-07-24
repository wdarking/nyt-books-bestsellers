import { useContext, useState } from "react";
import { useListCategoriesQuery } from "../../hooks/useBooksQuery";
import { ScrollArea } from "../ui/scroll-area";
import { AlertTriangle, SearchIcon } from "lucide-react";
import { ListActionContext } from "@/contexts/ListContext";
import { Skeleton } from "../Skeleton";
import { ErrorFeedback } from "../ErrorFeedback";

type CategoryListProps = {
  onOpenChange?: (open: boolean) => void;
};

export function CategoryList({ onOpenChange }: CategoryListProps) {
  const selectList = useContext(ListActionContext);
  const { data, isLoading, isError } = useListCategoriesQuery();
  const [filter, setFilter] = useState("");
  const filteredData =
    data?.results?.filter((result) =>
      result.display_name
        .toLocaleLowerCase()
        .includes(filter.toLocaleLowerCase()),
    ) ?? [];

  if (isLoading) {
    return <Skeleton count={10} />;
  }

  if (isError) {
    return (
      <ErrorFeedback.Root>
        <ErrorFeedback.Content
          title="Error loading lists"
          description="Something went wrong on our end. Try again in a minute"
          icon={AlertTriangle}
        />
      </ErrorFeedback.Root>
    );
  }

  return (
    <div className="h-full">
      <div className="focus-within:ring-2 ring-offset-2 ring-blue-600 h-12 overflow-hidden mb-3 border rounded bg-white flex items-center pl-3">
        <SearchIcon className="text-muted-foreground" />
        <input
          className="w-full text-base px-3 py-2.5 text-foreground outline-none"
          onChange={(e) => setFilter(e.currentTarget.value)}
          value={filter}
          placeholder="Search list..."
          type="text"
        />
      </div>
      <ScrollArea className="h-[calc(100%-3.75rem)]">
        <ul className="space-y-3">
          {filteredData.length ? (
            filteredData.map((list) => (
              <li
                key={list.list_name_encoded}
                onClick={() => {
                  selectList(list.list_name_encoded);
                  setFilter("");
                  onOpenChange?.(false);
                }}
                className="p-3 h-12 cursor-pointer bg-white rounded-md hover:bg-blue-200 group/category"
              >
                <span className="line-clamp-1 text-foreground group-hover/category:text-blue-900">
                  {list.display_name}
                </span>
              </li>
            ))
          ) : (
            <li className="line-clamp-1">No results for "{filter}"</li>
          )}
        </ul>
      </ScrollArea>
    </div>
  );
}
