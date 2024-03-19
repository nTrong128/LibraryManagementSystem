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
import Link from "next/link";

export default async function ProductPage() {
  let book: Book[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books`, {
      method: "GET",
      next: {tags: ["list-books"]},
      cache: "no-cache",
    });

    const data = await res.json();
    book = data.data;

    if (!data) return <div>Loading...</div>;
  } catch (error) {
    console.error("Error fetching books:", error);
  }

  return (
    <main>
      <Card className="flex-1">
        <CardHeader className="md:gap-4 bg-gray-200 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div className="flex gap-x-2">
              <BookOpen />
              <CardTitle>Sách</CardTitle>
            </div>

            <Link href="/product/new">
              <Button>Thêm sách</Button>
            </Link>
          </div>
        </CardHeader>
      </Card>
      <Table className="mx-auto my-10 border max-w-6xl">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Mã sách</TableHead>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Tác giả</TableHead>
            <TableHead>Thể loại</TableHead>
            <TableHead>Nhà xuất bản</TableHead>
            <TableHead>Năm xuất bản</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {book.map((book: Book) => (
            <TableRow key={book.id}>
              <TableCell className="font-medium">{book.id}</TableCell>
              <TableCell>{book.bookName}</TableCell>
              <TableCell>{book.author.authorName}</TableCell>
              <TableCell>{book.category.categoryName}</TableCell>
              <TableCell>{book.publisher.publisherName}</TableCell>
              <TableCell>{book.publicationYear}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
