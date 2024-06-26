"use client";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import {Reader} from "@/types";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {deleteReader} from "@/actions/reader";
import {Info, Trash2} from "lucide-react";
import {useRouter} from "next/navigation";
import {Input} from "../ui/input";
import {CreateLibraryCardDialog} from "../dialog/library-card-create";
import {useSortableData} from "@/lib/sorting";

export function BookaholicTable(prop: {readers: Reader[]}) {
  const {toast} = useToast();
  const [selectedReder, setSelectedReder] = useState<Reader>();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const [search, setSearch] = useState("");
  const filteredReaders = prop.readers.filter((reader) => {
    return (
      reader.readerName.toLowerCase().includes(search.toLowerCase()) ||
      reader.id.toString().includes(search)
    );
  });

  const {items, requestSort, sortConfig} = useSortableData(filteredReaders);
  const getClassNamesFor = (name: any) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <>
      <Input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        value={search}
        className="mx-auto mt-10 w-2/3 rounded-md"
        placeholder="Tìm kiếm độc giả"
      />
      <Table className="max-w-6xl mx-auto mt-10 border">
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => requestSort("id")} className="w-[120px]">
              Mã độc giả
            </TableHead>
            <TableHead onClick={() => requestSort("readerName")}>
              Tên độc giả
            </TableHead>
            <TableHead onClick={() => requestSort("address")}>
              Địa chỉ
            </TableHead>
            <TableHead>Mã thẻ</TableHead>
            <TableHead>Thẻ thư viện</TableHead>
            <TableHead>Tác vụ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((reader: Reader) => (
            <TableRow key={reader.id}>
              <TableCell>{reader.id}</TableCell>
              <TableCell className="font-medium">{reader.readerName}</TableCell>
              <TableCell>{reader.address}</TableCell>
              <TableCell>
                {(reader.libraryCard && (
                  <>
                    <span className="text-green-500">
                      Mã thẻ: {reader.libraryCard?.cardNumber}
                    </span>
                    {(reader.libraryCard.deleted && (
                      <p className="text-red-500 italic font-semibold mb-2">
                        Thẻ bị tạm khóa
                      </p>
                    )) ||
                      (new Date(reader.libraryCard.expirationDate) <
                        new Date() && (
                        <p className="text-red-500 italic font-semibold mb-2">
                          Thẻ đã quá hạn
                        </p>
                      ))}
                  </>
                )) || <CreateLibraryCardDialog reader={reader} />}
              </TableCell>
              <TableCell>
                <Button
                  className="text-blue-700 bg-blue-100 hover:text-blue-800 hover:bg-blue-200"
                  onClick={() => router.push(`/bookaholics/${reader.id}`)}>
                  <Info className="me-2" />
                  Chi tiết
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  className="text-red-700 bg-red-100 hover:text-red-800 hover:bg-red-200"
                  onClick={() => {
                    setSelectedReder(reader);
                    setIsOpen(true);
                  }}>
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Bạn có chắc muốn xóa đọc giả:{" "}
              <span className="italic text-red-500">
                {selectedReder?.readerName}
              </span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tất cả thông tin liên quan đến đọc giả sẽ bị xóa, bạn có chắc chắn
              muốn xóa đọc giả này không?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              className="hover:bg-red-600"
              onClick={async () => {
                setIsOpen(false);
                const res = await deleteReader(selectedReder?.id || 0);
                if (res.statusCode === 200) {
                  toast({
                    title: "Xóa đọc giả thành công",
                    description: (
                      <>
                        <span className="font-bold italic">
                          {selectedReder?.readerName}
                        </span>{" "}
                        đã được xóa thành công
                      </>
                    ),
                    duration: 3000,
                  });
                } else {
                  toast({
                    title: "Xóa đọc giả thất bại",
                    description:
                      "Có lỗi xảy ra khi xóa đọc giả, có thể đọc giả này đang mượn sách hoặc có thông tin liên quan khác.",
                    duration: 3000,
                  });
                }
              }}>
              Tiếp tục
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
