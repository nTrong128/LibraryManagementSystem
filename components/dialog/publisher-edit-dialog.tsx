import {FormEditPublisher} from "@/components/form/edit-publisher";
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
import {Publisher} from "@/types";
import {FilePenLine} from "lucide-react";
import {useState} from "react";
export default function EditPublisherDialog(params: {publisher: Publisher}) {
  const publisher = params.publisher;
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-green-700 bg-green-100 hover:text-green-800 hover:bg-green-200 mx-2">
          <FilePenLine />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Chỉnh sửa thông tin sách: {publisher.publisherName}
          </DialogTitle>
          <DialogDescription>
            Bạn có thể chỉnh sửa thông tin sách ở đây
          </DialogDescription>
          <FormEditPublisher
            publisher={publisher}
            open={open}
            setOpen={setOpen}
          />
          <DialogClose>
            <Button className="w-full">Đóng</Button>
          </DialogClose>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
