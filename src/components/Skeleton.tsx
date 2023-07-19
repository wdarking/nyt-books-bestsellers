import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type SkeletonProps = {
  children?: ReactNode;
  className?: string;
  count?: number;
};

export function Skeleton({ children, className, count = 1 }: SkeletonProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {!children
        ? Array.from({ length: count }).map((_, index) => (
            <div
              key={index}
              className="h-10 animate-pulse bg-slate-200 rounded-md w-full"
            ></div>
          ))
        : children}
    </div>
  );
}
