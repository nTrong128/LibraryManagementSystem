"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {CheckOut} from "@/types";

export function CheckOutTable(prop: {checkouts: CheckOut[]}) {
  const checkouts = prop.checkouts;
  if (!checkouts) return <div>no data...</div>;
  return (
    <>
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
              <TableCell>{checkout?.employee?.fullName}</TableCell>
              <TableCell>{checkout.checkoutDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
