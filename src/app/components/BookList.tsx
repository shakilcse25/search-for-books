"use client";

import { Book } from "@/types/book";
import BookCard from "./BookCard";
import ErrorMessage from "./ErrorMessage";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import LoadingSpinner from "./LoadingSpinner";
import { useSearchParams } from "next/navigation";

async function getBooks(query: string, type: string, page: number = 1) {
  const res = await fetch(
    `/api/books?query=${encodeURIComponent(query)}&type=${type}&page=${page}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  return res.json();
}

export default function BookList() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const type = searchParams.get("type") || "all";

  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  useEffect(() => {
    setBooks([]);
    setPage(1);
    setHasMore(true);
    setError(null);
    if (query) {
      loadBooks(query, type, 1);
    }
  }, [query, type]);

  useEffect(() => {
    if (inView && hasMore && !isLoading && query) {
      loadBooks(query, type, page + 1);
    }
  }, [hasMore, inView, isLoading, page, query, type]);

  const loadBooks = async (
    searchQuery: string,
    searchType: string,
    pageNumber: number
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getBooks(searchQuery, searchType, pageNumber);
      const newBooks = data.docs;

      if (pageNumber === 1) {
        setBooks(newBooks);
      } else {
        setBooks((prev) => [...prev, ...newBooks]);
      }

      setPage(pageNumber);
      setHasMore(newBooks.length > 0);
    } catch (err) {
      setError("Failed to load more books" + err);
    } finally {
      setIsLoading(false);
    }
  };

  if (error && page === 1) {
    return <ErrorMessage message={error} />;
  }

  if (books.length === 0 && !isLoading && query) {
    return <ErrorMessage message="No books found. Try a different search." />;
  }

  if (!query) {
    return null;
  }

  return (
    <div className="space-y-6 pb-20">
      <h2 className="text-xl font-semibold text-gray-800">
        Search Results for &quot;{query}&quot; ({type})
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <BookCard key={`${book.key}-${book.cover_i}`} book={book} />
        ))}
      </div>

      {isLoading && <LoadingSpinner />}

      <div ref={ref} className="h-1"></div>

      {!hasMore && books.length > 0 && (
        <p className="text-center text-gray-500 py-4">
          You&apos;ve reached the end of results
        </p>
      )}

      {error && page > 1 && (
        <ErrorMessage
          message={error}
          onRetry={() => loadBooks(query, type, page)}
        />
      )}
    </div>
  );
}
