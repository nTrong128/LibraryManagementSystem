"use client";
import {Card, CardTitle, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {UserSearch} from "lucide-react";
import useSWR from "swr";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Reader} from "@/type";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Bookaholic() {
  const {data, error} = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/readers`,
    fetcher
  );

  const readers: Reader[] = data?.data;
  if (error) return <div>Failed to load</div>;
  if (!readers) return <div>Loading...</div>;

  return (
    <main>
      <Card className="flex-1">
        <CardHeader className="md:gap-4 bg-gray-200 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div className="flex gap-x-2">
              <UserSearch />
              <CardTitle>Độc giả</CardTitle>
            </div>

            <Button>Thêm độc giả</Button>
          </div>
        </CardHeader>
      </Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Reader ID</TableHead>
            <TableHead>Reader Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="">Card Number</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {readers.map((reader: Reader) => (
            <TableRow key={reader.readerId}>
              <TableCell>{reader.readerId}</TableCell>
              <TableCell className="font-medium">{reader.readerName}</TableCell>
              <TableCell>{reader.address}</TableCell>
              <TableCell>{reader.libraryCard?.cardNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
