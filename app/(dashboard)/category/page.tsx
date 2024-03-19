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
import {Category} from "@/type";
import Link from "next/link";
const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Category() {
  const {data, error} = useSWR(
    "http://localhost:8080/api/v1/categories/",
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
              <CardTitle>Thể loại</CardTitle>
            </div>

            <Link href={"/category/new"}>
              <Button>Thêm thể loại</Button>
            </Link>
          </div>
        </CardHeader>
      </Card>
      <div className=" mx-auto my-10 border max-w-3xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên thể loại</TableHead>
              <TableHead>Số lượng sách</TableHead>
              <TableHead>Tác vụ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((category: Category) => (
              <TableRow key={category.id}>
                <TableCell>{category.categoryName}</TableCell>
                <TableCell>{category.numberOfBooks}</TableCell>
                <TableCell>
                  <div className="flex gap-x-2">
                    <Button>Sửa</Button>
                    <Button>Xóa</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
