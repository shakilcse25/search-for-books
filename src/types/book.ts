export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  subject?: string[];
  ratings_average?: number;
  ratings_count?: number;
  number_of_pages_median?: number;
  language?: string[];
  publisher?: string[];
  isbn?: string[];
  person?: string[];
  place?: string[];
  time?: string[];
  ia_collection?: string[];
  ia?: string[];
  public_scan_b?: boolean;
  has_fulltext?: boolean;
  edition_count?: number;
  edition_key?: string[];
  first_sentence?: string[];
  publish_date?: string[];
  publish_place?: string[];
  contributor?: string[];
  lccn?: string[];
  oclc?: string[];
  lcc?: string[];
  ddc?: string[];
  isbn_10?: string[];
  isbn_13?: string[];
}

export interface BookSearchResponse {
  docs: Book[];
  numFound: number;
  numFoundExact: boolean;
  q?: string;
  offset?: number;
}
