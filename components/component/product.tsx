"use client";
import {Trash2} from "lucide-react";
import {Button} from "../ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {Book} from "@/type";
import {useState} from "react";
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

export function ProductTable(prop: {book: Book[]}) {
  const {toast} = useToast();
  const [selectedBook, setSelectedBook] = useState<Book>();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Table className="mx-auto my-10 border max-w-6xl">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Mã sách</TableHead>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Tác giả</TableHead>
            <TableHead>Thể loại</TableHead>
            <TableHead>Nhà xuất bản</TableHead>
            <TableHead>Năm xuất bản</TableHead>
            <TableHead>Tác vụ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prop.book.map((book: Book) => (
            <TableRow key={book.id}>
              <TableCell className="font-medium">{book.id}</TableCell>
              <TableCell>{book.bookName}</TableCell>
              <TableCell>{book.author?.authorName}</TableCell>
              <TableCell>{book.category?.categoryName}</TableCell>
              <TableCell>{book.publisher?.publisherName}</TableCell>
              <TableCell>{book.publicationYear}</TableCell>
              <TableCell>
                <Button
                  className="text-red-700 bg-red-100 hover:text-red-800 hover:bg-red-200"
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
