type OverviewSchema<ResultType> = {
  status: string;
  copyright: string;
  num_results: number;
  last_modified?: string;
  results: ResultType;
};

type ListNameSchema = {
  list_name: string;
  display_name: string;
  list_name_encoded: string;
  oldest_published_date: string;
  newest_published_data: string;
  updated: "WEEKLY" | "MONTHLY";
};

type ISBN = {
  isbn10: string;
  isbn13: string;
};

type BookDetailsSchema = {
  title: string;
  description: string;
  contributor: string;
  author: string;
  contributor_note: string;
  price: number;
  age_group: string;
  publisher: string;
  primary_isbn13: string;
  primary_isbn10: string;
};

type ReviewSchema = {
  book_review_link: string;
  first_chapter_link: string;
  sunday_review_link: string;
  article_chapter_link: string;
};

type ListSchema = {
  list_name: string;
  display_name: string;
  bestsellers_date: string;
  published_date: string;
  rank: number;
  rank_last_week: number;
  weeks_on_list: number;
  asterisk: number;
  dagger: number;
  amazon_product_url: string;
  isbns: ISBN[];
  book_details: BookDetailsSchema[];
  reviews: ReviewSchema[];
};

export type BookSchema = {
  rank: number;
  rank_last_week: number;
  weeks_on_list: number;
  asterisk: number;
  dagger: boolean;
  primary_isbn10: number;
  primary_isbn13: string;
  publisher: string;
  description: string;
  price: number;
  title: string;
  author: string;
  contributor: string;
  contributor_note: string;
  book_image: string;
  amazon_product_url: string;
  age_group: string;
  book_review_link: string;
  first_chapter_link: string;
  sunday_review_link: string;
  article_chapter_link: string;
  isbns: ISBN[];
};

type ListByDateSchema = {
  list_name: string;
  bestsellers_date: string;
  published_date: string;
  display_name: string;
  normal_list_ends_at: number;
  updated: string;
  books: BookSchema[];
  corrections: any[];
};

type RankHistorySchema = {
  primary_isbn10: string;
  primary_isbn13: string;
  rank: number;
  list_name: string;
  display_name: string;
  published_date: string;
  bestsellers_date: string;
  weeks_on_list: number;
  ranks_last_week: null | number;
  asterisk: number;
  dagger: number;
};

type BookHistorySchema = {
  title: string;
  description: string;
  contributor: string;
  author: string;
  contributor_note: string;
  price: number;
  age_group: string;
  publisher: string;
  isbns: ISBN[];
  ranks_history: RankHistorySchema[];
  reviews: ReviewSchema[];
};

export type ListCategoriesResponse = Promise<OverviewSchema<ListNameSchema[]>>;
export type ListResponse = Promise<OverviewSchema<ListSchema[]>>;
export type ListByDateResponse = Promise<OverviewSchema<ListByDateSchema>>;
export type BookHistoryResponse = Promise<OverviewSchema<BookHistorySchema[]>>;
