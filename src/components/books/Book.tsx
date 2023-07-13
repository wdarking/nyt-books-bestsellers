import { useState } from "react";
import { BestSellerSchema } from "../../services/booksApi";
import { AlertTriangleIcon } from "lucide-react";

export function Book({ book_details: [book], ...ranking }: BestSellerSchema) {
  const [expanded, setExpanded] = useState(false);
  const { rank_last_week, rank } = ranking;
  const rankChange = rank_last_week !== 0 ? rank_last_week - rank : 0;

  return (
    <div
      className={`cursor-pointer transition-all bg-white overflow-hidden ${
        expanded ? "-mx-3 md:-mx-5" : "rounded"
      }`}
    >
      <div
        onClick={() => setExpanded((prev) => !prev)}
        className="flex items-center gap-3 md:gap-8"
      >
        <div
          className={`transition-all self-stretch ${expanded ? "p-5" : "p-0"}`}
        >
          <div
            className={`transition-all w-24 relative bg-slate-500 ${
              expanded
                ? "-skew-y-6 shadow-xl h-36"
                : "skew-y-0 min-h-full md:h-28"
            }`}
          >
            <img
              src={`https://covers.openlibrary.org/b/isbn/${book.primary_isbn13}-M.jpg`}
              alt="Book cover"
              className="transition-all absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1 py-3 md:py-5">
          <em className="text-[0.6rem] md:text-xs uppercase text-slate-600 tracking-wide">
            #{ranking.rank} &bull;{" "}
            {ranking.weeks_on_list <= 1
              ? "New"
              : `${ranking.weeks_on_list} weeks`}{" "}
            on list
          </em>
          <h2 className="text-sm leading-tight md:text-lg md:leading-tight line-clamp-1 tracking-wide font-bold">
            {book.title}
          </h2>
          <div className="flex justify-between">
            <small className="text-slate-500 text-[0.6rem] mb-1 md:text-sm font-normal leading-tight line-clamp-1">
              {book.contributor}
              {book.contributor && book.publisher && <> &bull; </>}
              {book.publisher}
            </small>
          </div>
          {expanded && (
            <p className="text-slate-600 text-xs leading-tight md:text-base line-clamp-3">
              {book.description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-5 py-5 pr-3 md:pr-5">
          {!!ranking.dagger && (
            <div
              title="Some retailers reported receiving bulk orders"
              className="text-slate-600"
            >
              <AlertTriangleIcon size={18} />
            </div>
          )}
          <RankingChangeStats diff={rankChange} />
        </div>
      </div>
    </div>
  );
}

type RankChange = "positive" | "negative" | "neutral";
type RankChangeStyle = { [key in RankChange]: string };

function RankingChangeStats({ diff }: { diff: number }) {
  const state: RankChange =
    diff !== 0 ? (diff > 0 ? "positive" : "negative") : "neutral";

  const stateStyle: RankChangeStyle = {
    positive: "bg-green-100 text-green-900",
    negative: "bg-red-100 text-red-900",
    neutral: "bg-slate-200 text-slate-900",
  };

  return (
    <div
      className={`w-8 h-8 grid place-items-center text-center rounded-md text-xs font-bold ${stateStyle[state]}`}
    >
      <span>
        {state === "positive" && "+"}
        {state !== "neutral" ? diff : "-"}
      </span>
    </div>
  );
}
