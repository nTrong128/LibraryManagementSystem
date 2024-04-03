"use client";
import {ReceiptText, Trash2} from "lucide-react";
import {Button} from "../ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {Book} from "@/types";
import {useMemo, useState} from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {deleteProduct} from "@/actions/product";
import {useToast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import EditBookDialog from "@/components/dialog/book-edit-dialog";
import {Input} from "../ui/input";
import {useSortableData} from "@/lib/sorting";

export function ProductTable(prop: {book: Book[]}) {
  const router = useRouter();
  const {toast} = useToast();
  const [selectedBook, setSelectedBook] = useState<Book>();
  const [isOpen, setIsOpen] = useState(false);

  const [search, setSearch] = useState("");
  const filteredBooks = prop.book.filter((book) => {
    return (
      book.bookName.toLowerCase().includes(search.toLowerCase()) ||
      book.id.toString().includes(search)
    );
  });

  const {items, requestSort, sortConfig} = useSortableData(filteredBooks);
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
        placeholder="Tìm kiếm sách"
      />
      <Table className="mx-auto my-10 border max-w-6xl">
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => requestSort("id")} className="w-[100px]">
              Mã sách
            </TableHead>

            <TableHead onClick={() => requestSort("bookName")}>
              Tiêu đề
            </TableHead>

            <TableHead>Tác giả</TableHead>
            <TableHead>Thể loại</TableHead>
            <TableHead>Nhà xuất bản</TableHead>
            <TableHead onClick={() => requestSort("publicationYear")}>
              Năm xuất bản
            </TableHead>
            <TableHead>Tác vụ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((book: Book) => (
            <TableRow key={book.id}>
              <TableCell className="font-medium">{book.id}</TableCell>
              <TableCell>{book.bookName}</TableCell>
              <TableCell>{book.author?.authorName}</TableCell>
              <TableCell>{book.category?.categoryName}</TableCell>
              <TableCell>{book.publisher?.publisherName}</TableCell>
              <TableCell>{book.publicationYear}</TableCell>
              <TableCell className="flex gap-y-2">
                <Button
                  className="text-blue-700 bg-blue-100 hover:text-blue-800 hover:bg-blue-200 mx-2"
                  onClick={() => router.push(`/products/${book.id}`)}>
                  <ReceiptText />
                </Button>
                <EditBookDialog book={book} isSmallIcon={true} />
                <Button
                  className="text-red-700 bg-red-100 hover:text-red-800 hover:bg-red-200 mx-2"
                  onClick={() => {
                    setSelectedBook(book);
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
              Bạn có chắc muốn xóa sách:{" "}
              <span className="italic text-red-500">
                {selectedBook?.bookName}
              </span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="hover:bg-red-600"
              onClick={async () => {
                setIsOpen(false);
                const res = await deleteProduct(selectedBook?.id || 0);
                if (res.statusCode === 200) {
                  toast({
                    title: "Xóa sách thành công",
                    description: (
                      <>
                        <span className="font-bold italic">
                          {selectedBook?.bookName}
                        </span>{" "}
                        đã được xóa thành công
                      </>
                    ),
                    duration: 3000,
                  });
                } else {
                  toast({
                    title: "Xóa sách thất bại",
                    description: "Có lỗi xảy ra khi xóa sách",
                    duration: 3000,
                  });
                }
              }}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
