import {FormEditCategory} from "@/components/form/edit-category";
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
import {Category} from "@/types";
import {FilePenLine} from "lucide-react";
import {useState} from "react";
export default function EditCategoryDialog(params: {category: Category}) {
  const category = params.category;
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
            Chỉnh sửa thông tin sách: {category.categoryName}
          </DialogTitle>
          <DialogDescription>
            Bạn có thể chỉnh sửa thông tin sách ở đây
          </DialogDescription>
          <FormEditCategory category={category} open={open} setOpen={setOpen} />
          <DialogClose>
            <Button className="w-full">Đóng</Button>
          </DialogClose>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
