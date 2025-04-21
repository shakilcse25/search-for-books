"use client";
import { Book } from "@/types/book";
import Image from "next/image";
import { StarIcon, CalendarIcon } from "@heroicons/react/24/outline";
import imageLoader from "./ImageLoader";

export default function BookCard({ book }: { book: Book }) {
  const rating = book.ratings_average?.toFixed(1) || "N/A";
  const languages = book.language?.slice(0, 2).join(", ") || "Unknown";
  const publishYear = book.first_publish_year || "Unknown";

  const isRemoteImage = Boolean(book.cover_i);
  const imageSrc = isRemoteImage
    ? `/b/id/${book.cover_i}-M.jpg`
    : "/book-placeholder.jpg";

  // Only apply loader for remote images
  const imageLoaderFn = isRemoteImage
    ? imageLoader
    : ({ src }: { src: string }) => src;

  return (
    <div className="group relative flex flex-col md:flex-row gap-6 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-100">
      {/* Book Cover with subtle hover effect */}
      <div className="w-full md:w-40 flex-shrink-0 relative overflow-hidden rounded-lg">
        <Image
          loader={imageLoaderFn}
          src={imageSrc}
          alt={`Cover of ${book.title}`}
          width={160}
          height={240}
          className="object-cover w-full h-60 md:h-full transition-transform duration-300 group-hover:scale-105"
        />

        {/* Rating badge */}
        {book.ratings_average && (
          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center text-xs font-semibold text-amber-600 shadow-sm">
            <StarIcon className="w-3 h-3 mr-1 fill-amber-400" />
            {rating}
          </div>
        )}
      </div>

      {/* Book Details */}
      <div className="flex-1 flex flex-col">
        {/* Title with hover effect */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {book.title}
        </h3>

        {/* Author */}
        {book.author_name && (
          <p className="text-gray-700 mb-3">
            by{" "}
            <span className="font-medium">
              {book.author_name
                ? book.author_name.join(", ").length > 24
                  ? `${book.author_name.join(", ").substring(0, 24)}...`
                  : book.author_name.join(", ")
                : "Unknown author"}
            </span>
          </p>
        )}

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-3 mt-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <CalendarIcon className="w-4 h-4 mr-1.5 text-gray-400" />
            {publishYear}
          </div>
          {languages && (
            <div className="flex items-center text-sm text-gray-600 col-span-2">
              <span className="font-medium">Language(s):</span> {languages}
            </div>
          )}
        </div>

        {/* Subjects */}
        {book.subject && (
          <div className="mt-auto pt-3 border-t border-gray-100">
            <p className="text-xs font-medium text-gray-500 mb-2">Subjects</p>
            <div className="flex flex-wrap gap-2">
              {book.subject.slice(0, 4).map((subject, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 bg-gray-50 text-gray-700 text-xs rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  {subject.length > 20
                    ? `${subject.substring(0, 20)}...`
                    : subject}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
