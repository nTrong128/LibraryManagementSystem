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
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function AuthorPage() {
  const {data, error} = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/authors`,
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
            <Link href={"/author/new"}>
              <Button>Thêm tác giả</Button>
            </Link>
          </div>
        </CardHeader>
      </Card>
      <div>
        <Table className="max-w-5xl border mx-auto mt-10">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Mã tác giả</TableHead>
              <TableHead>Tên tác giả</TableHead>
              <TableHead>Địa chỉ website</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead>Số lượng tác phẩm</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((author: Author) => (
              <TableRow key={author.id}>
                <TableCell>{author.id}</TableCell>
                <TableCell>{author.authorName}</TableCell>
                <TableCell className="hover:text-blue-600">
                  <Link target="_blank" href={`http://${author.website}`}>
                    {author.website}
                  </Link>
                </TableCell>
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
