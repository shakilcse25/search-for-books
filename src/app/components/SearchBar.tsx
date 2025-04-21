"use client";

import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type SearchType = "all" | "title" | "author" | "subject";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?query=${encodeURIComponent(query)}&type=${searchType}`);
    }
  };

  const handleSearchTypeChange = (type: SearchType) => {
    setSearchType(type);
    setIsDropdownOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex">
        {/* Search type dropdown */}
        <div className="relative">
          <button
            type="button"
            className="flex-shrink-0 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {searchType === "all" && "All"}
            {searchType === "title" && "Title"}
            {searchType === "author" && "Author"}
            {searchType === "subject" && "Subject"}
            <ChevronDownIcon className="w-4 h-4 ml-1" />
          </button>

          {isDropdownOpen && (
            <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-36">
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <button
                    type="button"
                    onClick={() => handleSearchTypeChange("all")}
                    className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                  >
                    All
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleSearchTypeChange("title")}
                    className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                  >
                    Title
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleSearchTypeChange("author")}
                    className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                  >
                    Author
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleSearchTypeChange("subject")}
                    className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                  >
                    Subject
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Search input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
        </div>

        {/* Search button */}
        <button
          type="submit"
          className="flex-shrink-0 inline-flex items-center py-2.5 px-4 text-sm font-medium text-white bg-blue-700 border border-blue-700 rounded-r-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Search
        </button>
      </div>
    </form>
  );
}
