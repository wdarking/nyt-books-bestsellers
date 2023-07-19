import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { CategoryList } from "./books/CategoryList";
import { useState } from "react";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={"ghost"} className="px-0 md:hidden">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="py-3 h-full">
          <CategoryList onOpenChange={setOpen} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
