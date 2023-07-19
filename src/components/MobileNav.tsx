import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { CategoryList } from "./books/CategoryList";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} className="px-0 md:hidden">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="py-3 h-full">
          <CategoryList setSelectedList={() => ""} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
