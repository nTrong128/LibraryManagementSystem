"use client";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import {Author} from "@/types";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import {deleteAuthor} from "@/actions/author";
import {Trash2} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import EditAuthorDialog from "../dialog/author-edit-dialog";

export function AuthorTable(prop: {authors: Author[]}) {
  const {toast} = useToast();
  const [selectedAuthor, setSelectedAuthor] = useState<Author>();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Table className="max-w-6xl mt-10 mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Mã tác giả</TableHead>
            <TableHead>Tên tác giả</TableHead>
            <TableHead>Trang web</TableHead>
            <TableHead>Ghi chú</TableHead>
            <TableHead>Số lượng sách</TableHead>
            <TableHead>Tác vụ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prop.authors.map((author: Author) => (
            <TableRow key={author.id}>
              <TableCell>{author.id}</TableCell>
              <TableCell>{author.authorName}</TableCell>
              <TableCell>
                <Link
                  target="_blank"
                  href={`${author?.website}`}
                  className=" hover:text-blue-800">
                  {author?.website}
                </Link>
              </TableCell>
              <TableCell>{author.note}</TableCell>
              <TableCell className="text-center">
                {author.numberOfBooks}
              </TableCell>
              <TableCell>
                <EditAuthorDialog author={author} />
                <Button
                  className="text-red-700 bg-red-100 hover:text-red-800 hover:bg-red-200"
                  onClick={() => {
                    setSelectedAuthor(author);
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
              Bạn có chắc muốn xóa tác giả:{" "}
              <span className="italic text-red-500">
                {selectedAuthor?.authorName}
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
                const res = await deleteAuthor(selectedAuthor?.id || 0);
                if (res.statusCode === 200) {
                  toast({
                    title: "Xóa tác giả thành công",
                    description: (
                      <>
                        <span className="font-bold italic">
                          {selectedAuthor?.authorName}
                        </span>{" "}
                        đã được xóa thành công
                      </>
                    ),
                    duration: 3000,
                  });
                } else {
                  toast({
                    title: "Xóa tác giả thất bại",
                    description:
                      "Có lỗi xảy ra khi xóa đọc giả, có thể tác giả này đang có thông tin liên quan khác",
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
