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
import {Button} from "../ui/button";
import {useRouter} from "next/navigation";
import {Input} from "../ui/input";
import {useState} from "react";
import {useSortableData} from "@/lib/sorting";

export function CheckOutTable(prop: {checkouts: CheckOut[]}) {
  const router = useRouter();
  const checkouts = prop.checkouts;
  const [search, setSearch] = useState("");
  const filteredCheckouts = checkouts.filter((checkout) => {
    return (
      checkout.id.toString().includes(search) ||
      checkout.libraryCard.cardNumber.toString().includes(search) ||
      checkout.employee.fullName.toLowerCase().includes(search.toLowerCase())
    );
  });
  const {items, requestSort, sortConfig} = useSortableData(filteredCheckouts);
  const getClassNamesFor = (name: any) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  if (!checkouts) return <div>no data...</div>;
  return (
    <>
      <Input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        value={search}
        className="mx-auto mt-10 w-2/3 rounded-md"
        placeholder="Tìm kiếm mượn trả theo mã thẻ thư viện"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Mã mượn trả</TableHead>
            <TableHead>Số thẻ</TableHead>
            <TableHead>Người tạo</TableHead>
            <TableHead onClick={() => requestSort("checkoutDate")}>
              Ngày mượn
            </TableHead>
            <TableHead onClick={() => requestSort("returnedAll")}>
              Trạng thái
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((checkout: CheckOut) => (
            <TableRow key={checkout.id}>
              <TableCell>{checkout.id}</TableCell>
              <TableCell>{checkout.libraryCard.cardNumber}</TableCell>
              <TableCell>{checkout?.employee?.fullName}</TableCell>
              <TableCell>{checkout.checkoutDate}</TableCell>
              <TableCell>
                {(checkout.returnedAll && (
                  <span className="text-green-500">Đã hoàn thành</span>
                )) || <span className="text-red-500">Chưa hoàn thành</span>}
              </TableCell>
              <TableCell>
                <Button
                  className="bg-blue-500 text-blue-50 hover:bg-blue-700"
                  onClick={() => router.push(`/checkouts/${checkout.id}`)}>
                  Chi tiết
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
