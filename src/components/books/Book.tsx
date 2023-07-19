import { useState } from "react";
import { BookSchema } from "../../services/booksApiTypes";
import { useBooksHistoryQuery } from "../../hooks/useBooksQuery";
import { AlertTriangleIcon } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type BookProps = {
  book: BookSchema;
  listName: string;
};

export function Book({ book, listName }: BookProps) {
  const [expanded, setExpanded] = useState(false);
  const { rank_last_week, rank } = book;
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
          className={`transition-all self-stretch ${
            expanded ? "py-6 pl-5 pr-2" : ""
          }`}
        >
          <div
            className={`transition-all w-24 relative bg-slate-500 ${
              expanded
                ? "-skew-y-6 shadow-xl h-36"
                : "skew-y-0 min-h-full md:h-28"
            }`}
          >
            <img
              src={book.book_image}
              alt="Book cover"
              className="transition-all absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1 py-3 md:py-5">
          <em className="text-[0.6rem] md:text-xs uppercase text-slate-600 tracking-wide">
            #{book.rank} &bull;{" "}
            {book.weeks_on_list <= 1 ? "New" : `${book.weeks_on_list} weeks`} on
            list
          </em>
          <h2 className="text-sm text-slate-700 leading-tight md:text-lg md:leading-tight line-clamp-1 tracking-wide font-bold">
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
          {!!book.dagger && (
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
      {expanded && (
        <RankingHistory
          currentRank={rank}
          listName={listName}
          isbn={book.primary_isbn13}
        />
      )}
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

export function RankingHistory({
  isbn,
  currentRank,
  listName,
}: {
  isbn: string;
  listName: string;
  currentRank: number;
}) {
  const { data, isLoading, isError } = useBooksHistoryQuery(isbn);
  const rankHistoryForList =
    data?.results[0].ranks_history.filter((record) => {
      const forCurrentList = record.display_name === listName;
      const publishedUptilNow = new Date(record.published_date) <= new Date();
      return forCurrentList && publishedUptilNow;
    }) ?? [];

  const hasRankingHistory = rankHistoryForList.length > 0;

  const peakRank = hasRankingHistory
    ? Math.min(...rankHistoryForList.map((record) => record.rank))
    : 0;

  const timeAtPeak = rankHistoryForList.filter(
    (record) => record.rank === peakRank,
  ).length;

  if (isLoading) {
    return <RankingHistorySkeleton />;
  }

  if (isError) {
    return <RankingHistoryError />;
  }

  return (
    <div className="p-3 md:p-5 bg-slate-200">
      <h4 className="text-slate-700 font-medium mb-1">Ranking development</h4>
      <div className="flex justify-between mb-3">
        <div className="flex-1 leading-tight">
          <span className="text-xs text-slate-500">Current rank</span>
          <p className="text-slate-700">#{currentRank}</p>
        </div>
        <div className="text-right leading-tight">
          <span className="text-xs text-slate-500">Peak</span>
          <p className="text-slate-700">
            {hasRankingHistory ? `#${peakRank}` : "No data"}
          </p>
        </div>
        <div className="text-right leading-tight ml-5 md:ml-7">
          <span className="text-xs text-slate-500">Time at peak</span>
          <p className="text-slate-700">
            {hasRankingHistory
              ? `${timeAtPeak} ${timeAtPeak > 1 ? "weeks" : "week"}`
              : "No data"}
          </p>
        </div>
      </div>
      {hasRankingHistory ? (
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={rankHistoryForList}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              fontSize={12}
              tickMargin={8}
              reversed
              dataKey="published_date"
              interval={"preserveStartEnd"}
              tickFormatter={(val) =>
                `${new Date(val)
                  .toISOString()
                  .split("T")[0]
                  .replace(/-/g, "/")}`
              }
            />
            <YAxis
              fontSize={12}
              interval={"preserveStartEnd"}
              allowDecimals={false}
              tickCount={5}
              domain={[1, "maxData"]}
              reversed
              dataKey={"rank"}
              tickMargin={0}
            />
            <Tooltip />
            <Line dataKey={"rank"} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <span className="text-slate-500">No ranking history found</span>
      )}
    </div>
  );
}

function RankingHistorySkeleton() {
  return (
    <div className="p-3  md:p-5 bg-slate-200 animate-pulse space-y-3 md:space-y-5">
      <div className="bg-slate-300 rounded-md h-3 w-1/4"></div>
      <div className="flex">
        <div className="bg-slate-300 rounded-md h-3 w-16"></div>
        <div className="ml-auto flex">
          <div className="bg-slate-300 rounded-md h-3 w-16  "></div>
          <div className="bg-slate-300 rounded-md h-3 w-16 ml-8"></div>
        </div>
      </div>
      <div className="border-l-4 border-b-4 border-slate-300 h-44 w-full"></div>
    </div>
  );
}

function RankingHistoryError() {
  return (
    <div className="p-3 md:p-5 bg-slate-200">
      <span className="text-slate-500">
        Could not fetch ranking history. Try again later
      </span>
    </div>
  );
}
