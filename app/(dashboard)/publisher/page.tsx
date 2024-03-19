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
import {Publisher} from "@/type";
const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Category() {
  const {data, error} = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/publishers`,
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
              <CardTitle>Nhà xuất bản</CardTitle>
            </div>

            <Button>Thêm nhà xuất bản</Button>
          </div>
        </CardHeader>
      </Card>
      <div className=" mx-auto my-10 border max-w-3xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên nhà xuất bản</TableHead>
              <TableHead>Địa chỉ</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Thông tin đại diện</TableHead>
              <TableHead>Số lượng sách</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((category: Publisher) => (
              <TableRow key={category.id}>
                <TableCell>{category.publisherName}</TableCell>
                <TableCell>{category.address}</TableCell>
                <TableCell>{category.email}</TableCell>
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