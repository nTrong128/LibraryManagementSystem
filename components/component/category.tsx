"use client";
import {Category} from "@/types";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
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
import {Trash2} from "lucide-react";
import {DeleteCategory} from "@/actions/category";
import EditCategoryDialog from "./dialog/category-edit-dialog";

export function CategoryTable(prop: {categories: Category[]}) {
  const {toast} = useToast();
  const [selectedReder, setSelectedReder] = useState<Category>();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mã loại</TableHead>
            <TableHead>Tên thể loại</TableHead>
            <TableHead>Số lượng sách</TableHead>
            <TableHead>Tác vụ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prop.categories.map((category: Category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.categoryName}</TableCell>
              <TableCell>{category.numberOfBooks}</TableCell>
              <TableCell>
                <div className="flex gap-x-2">
                  <EditCategoryDialog category={category} />
                  <Button
                    className="text-red-700 bg-red-100 hover:text-red-800 hover:bg-red-200"
                    onClick={() => {
                      setSelectedReder(category);
                      setIsOpen(true);
                    }}>
                    <Trash2 />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Bạn có chắc muốn xóa thể loại sách:{" "}
              <span className="italic text-red-500">
                {selectedReder?.categoryName}
              </span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tất cả thông tin liên quan đến thể loại sách sẽ bị xóa, bạn có
              chắc chắn muốn xóa thể loại sách này không?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              className="hover:bg-red-600"
              onClick={async () => {
                setIsOpen(false);
                const res = await DeleteCategory(selectedReder?.id || 0);
                if (res.statusCode === 200) {
                  toast({
                    title: "Xóa thể loại sách thành công",
                    description: (
                      <>
                        <span className="font-bold italic">
                          {selectedReder?.categoryName}
                        </span>{" "}
                        đã được xóa thành công
                      </>
                    ),
                    duration: 3000,
                  });
                } else {
                  toast({
                    title: "Xóa thể loại sách thất bại",
                    description:
                      "Có lỗi xảy ra khi xóa thể loại sách, có thể thể loại sách này đang mượn sách hoặc có thông tin liên quan khác.",
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
