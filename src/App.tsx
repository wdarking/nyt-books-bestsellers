import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./config/queryClient";
import { CategoryList } from "./components/books/CategoryList";
import { BooksList } from "./components/books/BooksList";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ListProvider } from "./contexts/ListContext";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ListProvider>
        <div className="min-h-screen grid grid-rows-[min-content_1fr_min-content] bg-slate-100 space-y-5 md:space-y-10">
          <Header />
          <div className="container mx-auto px-3 flex flex-col">
            <div className="flex flex-col md:flex-row gap-3 md:gap-5 flex-1">
              <aside className="hidden w-[300px] md:block h-[calc(100vh-2.5rem)] md:sticky top-10 rounded">
                <CategoryList />
              </aside>
              <div className="flex-1 md:px-5">
                <BooksList />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </ListProvider>
    </QueryClientProvider>
  );
}

export default App;
