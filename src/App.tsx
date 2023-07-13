import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CategoryList } from "./components/books/CategoryList";
import { useState } from "react";
import { BooksList } from "./components/books/BooksList";

const queryClient = new QueryClient();

function App() {
  const [selectedList, setSelectedList] = useState("hardcover-fiction");
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen grid bg-slate-100">
        <div className="container mx-auto p-3 flex flex-col">
          <h1 className="text-2xl font-medium text-center mb-3">
            Hello NYC Bestsellers!
          </h1>
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 flex-1">
            <div className="md:w-[300px]">
              <CategoryList setSelectedList={setSelectedList} />
            </div>
            <div className="flex-1 md:px-5">
              <BooksList listSlug={selectedList} />
            </div>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
