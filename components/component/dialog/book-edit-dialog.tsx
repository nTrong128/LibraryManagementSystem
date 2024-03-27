import {FormEditBook} from "@/components/form/edit-book";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";
import {Book} from "@/types";
import {FilePenLine} from "lucide-react";
import {useState} from "react";
export default function EditBookDialog(params: {
  book: Book;
  isSmallIcon: Boolean;
}) {
  const book = params.book;
  const smallIcon = params.isSmallIcon;
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {(smallIcon && (
          <Button className="text-green-700 bg-green-100 hover:text-green-800 hover:bg-green-200 mx-2">
            <FilePenLine />
          </Button>
        )) || (
          <Button className="flex mx-2 text-green-700 bg-green-100 hover:text-green-800 hover:bg-green-200">
            <FilePenLine strokeWidth={3} />
            Chỉnh sửa thông tin sách
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin sách: {book.bookName}</DialogTitle>
          <DialogDescription>
            Bạn có thể chỉnh sửa thông tin sách ở đây
          </DialogDescription>
          <FormEditBook book={book} open={open} setOpen={setOpen} />
          <DialogClose>
            <Button className="w-full">Đóng</Button>
          </DialogClose>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
