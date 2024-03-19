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
import {CheckOut} from "@/type";
export default async function CheckOut() {
  let checkouts: CheckOut[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/checkouts`,
      {
        method: "GET",
        next: {tags: ["list-checkouts"]},
        cache: "no-cache",
      }
    );

    const data = await res.json();
    checkouts = data.data;

    if (!data) return <div>Loading...</div>;
  } catch (error) {
    console.error("Error fetching checkouts:", error);
  }
  return (
    <main>
      <Card className="flex-1">
        <CardHeader className="md:gap-4 bg-gray-200 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div className="flex gap-x-2">
              <PersonStanding />
              <CardTitle>Mượn sách</CardTitle>
            </div>

            <Button>Thêm mượn</Button>
          </div>
        </CardHeader>
      </Card>
      <div className="flex items-center justify-center m-12 border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Mã mượn trả</TableHead>
              <TableHead>Số thẻ</TableHead>
              <TableHead>Nhân viên</TableHead>
              <TableHead>Ngày mượn</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {checkouts.map((checkout: CheckOut) => (
              <TableRow key={checkout.id}>
                <TableCell>{checkout.id}</TableCell>
                <TableCell>{checkout.libraryCard.cardNumber}</TableCell>
                <TableCell>{checkout.employee.fullName}</TableCell>
                <TableCell>{checkout.checkOutDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
