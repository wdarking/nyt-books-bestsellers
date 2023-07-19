import { BookIcon } from "lucide-react";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="bg-white">
      <div className="container mx-auto h-16 flex items-center justify-between px-3">
        <div className="flex items-center space-x-2">
          <BookIcon />
          <span className="text-xl">NYT Best Sellers</span>
        </div>
        <MobileNav />
      </div>
    </header>
  );
}
