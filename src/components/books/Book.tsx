import { useState } from "react";
import { BestSellerSchema } from "../../services/books-api";
import { AlertTriangleIcon, FlameIcon } from "lucide-react";

export function Book({ book_details: [book], ...ranking }: BestSellerSchema) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="cursor-pointer bg-slate-100 border border-slate-100 hover:border-slate-200 rounded">
      <div
        onClick={() => setExpanded((prev) => !prev)}
        className="flex items-center justify-start p-3 gap-3 md:gap-6"
      >
        <span className="text-xl ml-1.5 md:ml-3">#{ranking.rank}</span>

        <div className="flex-1">
          <h2 className="text-sm md:text-base tracking-wide font-medium leading-tight line-clamp-2">
            {book.title}
          </h2>
          <div className="flex justify-between">
            <small className="text-slate-500 text-xs md:text-sm font-normal leading-tight">
              {book.contributor}
              {book.contributor && book.publisher && <> &bull; </>}
              {book.publisher}
            </small>
          </div>
        </div>
        {!!ranking.dagger && (
          <div
            title="Some retailers reported receiving bulk orders"
            className="text-slate-900 font-bold"
          >
            <AlertTriangleIcon size={18} />
          </div>
        )}
        <RankingStats {...ranking} />
      </div>
      {expanded && (
        <div className="p-3 bg-slate-50">
          <p>{book.description}</p>
          {ranking.reviews[0].book_review_link &&
            ranking.reviews.map((review) => (
              <a
                href={review.book_review_link}
                target="_blank"
                className="underline text-blue-700 font-medium"
              >
                Read review
              </a>
            ))}
        </div>
      )}
    </div>
  );
}

export function RankingStats({
  rank,
  rank_last_week,
  weeks_on_list,
}: {
  rank: number;
  rank_last_week: number;
  weeks_on_list: number;
}) {
  const isNewOnRank = rank_last_week === 0;
  const isStreak = weeks_on_list > 1;
  const lastRankDiff = rank_last_week - rank;

  return (
    <div className="flex items-center gap-3 md:gap-6">
      {isStreak ? (
        <div
          title={`${weeks_on_list} weeks on list`}
          className="text-slate-900 inline-flex items-center leading-none font-bold"
        >
          <FlameIcon size={18} />
          <span className="text-sm ">{weeks_on_list}</span>
        </div>
      ) : (
        <div className=" text-slate-900 inline-flex items-center leading-none font-bold">
          <span className="text-sm uppercase tracking-wide leading-none">
            New
          </span>
        </div>
      )}
      {!isNewOnRank && <RankingChangeStats diff={lastRankDiff} />}
    </div>
  );
}

type RankChange = "positive" | "negative" | "neutral";
type RankChangeStyle = { [key in RankChange]: string };

function RankingChangeStats({ diff }: { diff: number }) {
  const state: RankChange =
    diff !== 0 ? (diff > 0 ? "positive" : "negative") : "neutral";

  const stateStyle: RankChangeStyle = {
    positive: "bg-green-300 text-green-900",
    negative: "bg-red-300 text-red-900",
    neutral: "bg-slate-300 text-slate-900",
  };

  return (
    <div
      className={`w-8 h-8 grid place-items-center text-center rounded-md text-sm font-bold ${stateStyle[state]}`}
    >
      <span>
        {state === "positive" && "+"}
        {state !== "neutral" ? diff : "-"}
      </span>
    </div>
  );
}
