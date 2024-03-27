"use client";
import {Book} from "@/types";
import {FilePenLine} from "lucide-react";
import {Button} from "@/components/ui/button";
import EditBookDialog from "@/components/component/dialog/book-edit-dialog";

export function BookDetail(params: {book: Book}) {
  const book = params.book;
  return (
    <div className="w-full py-6">
      <div className="container rounded-lg grid shadow-lg overflow-hidden py-10 max-w-2xl px-4 items-start gap-6 sm:grid-cols-2 sm:max-w-4xl md:gap-10 lg:max-w-5xl lg:gap-12 xl:max-w-6xl">
        <div className=" gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {book.bookName}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              {book.author.authorName}
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
              {book.publicationYear}
            </h2>
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
              {book.category.categoryName}
            </h2>
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
              {book.publisher.publisherName}
            </h2>
          </div>
        </div>
        <EditBookDialog book={book} isSmallIcon={false} />
      </div>
    </div>
  );
}
