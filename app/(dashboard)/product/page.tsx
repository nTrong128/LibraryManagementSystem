"use client";
import {Button} from "@/components/ui/button";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import {Book} from "@/type";
import {BookOpen} from "lucide-react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function ProductPage() {
  const {data, error} = useSWR("http://localhost:8080/api/v1/books/", fetcher);
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <main className="m-2">
      <Card className="flex-1">
        <CardHeader className="md:gap-4 bg-gray-200 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div className="flex gap-x-2">
              <BookOpen />
              <CardTitle>Sách</CardTitle>
            </div>

            <Button>Thêm sách</Button>
          </div>
        </CardHeader>
      </Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Book ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Author ID</TableHead>
            <TableHead>Category ID</TableHead>
            <TableHead>Publisher ID</TableHead>
            <TableHead>Publication Year</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((book: Book) => (
            <TableRow key={book.id}>
              <TableCell className="font-medium">{book.id}</TableCell>
              <TableCell>{book.bookName}</TableCell>
              <TableCell>{book.author.authorName}</TableCell>
              <TableCell className="text-right">
                {book.category.categoryName}
              </TableCell>
              <TableCell>{book.publisher.publisherName}</TableCell>
              <TableCell>{book.publicationYear}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
