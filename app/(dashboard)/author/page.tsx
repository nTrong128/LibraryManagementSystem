"use client";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {PersonStanding} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useSWR from "swr";
import {Author} from "@/type";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function AuthorPage() {
  const {data, error} = useSWR(
    "http://localhost:8080/api/v1/authors/",
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <main>
      <Card className="flex-1">
        <CardHeader className="md:gap-4 bg-gray-200 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div className="flex gap-x-2">
              <PersonStanding />
              <CardTitle>Tác giả</CardTitle>
            </div>
            <Button>Thêm tác giả</Button>
          </div>
        </CardHeader>
      </Card>
      <div className="flex items-center justify-center m-12 border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Mã mượn trả</TableHead>
              <TableHead>Số thẻ</TableHead>
              <TableHead>Mã nhân viên</TableHead>
              <TableHead>Ngày mượn</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((author: Author) => (
              <TableRow key={author.id}>
                <TableCell>{author.authorName}</TableCell>
                <TableCell>{author.website}</TableCell>
                <TableCell>{author.note}</TableCell>
                <TableCell>{author.numberOfBooks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
