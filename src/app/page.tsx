// Home.tsx or page.tsx
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import { Suspense } from "react";
import LoadingSpinner from "./components/LoadingSpinner";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Open Library Search
        </h1>
        <p className="text-gray-600 mb-6">
          Discover millions of books from the Open Library
        </p>
        <SearchBar />
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <BookList />
      </Suspense>
    </div>
  );
}
