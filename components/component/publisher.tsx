"use client";
import {Button} from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableHeader,
  TableCell,
} from "@/components/ui/table";
import {Publisher} from "@/types";
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
import {useToast} from "@/components/ui/use-toast";
import {useState} from "react";
import {Trash2} from "lucide-react";
import {deletePublisher} from "@/actions/publisher";

export function PublisherTable(prop: {publishers: Publisher[]}) {
  const {toast} = useToast();
  const [selected, setselectedPublisher] = useState<Publisher>();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mã NXB</TableHead>
            <TableHead>Tên nhà xuất bản</TableHead>
            <TableHead>Địa chỉ</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Thông tin đại diện</TableHead>
            <TableHead>Số lượng sách</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prop.publishers.map((publisher: Publisher) => (
            <TableRow key={publisher.id}>
              <TableCell>{publisher.id}</TableCell>
              <TableCell>{publisher.publisherName}</TableCell>
              <TableCell>{publisher.address}</TableCell>
              <TableCell>{publisher.email}</TableCell>
              <TableCell>{publisher.representativeInfo}</TableCell>
              <TableCell>{publisher.numberOfBooks}</TableCell>
              <TableCell>
                <div className="flex gap-x-2">
                  <Button>Sửa</Button>
                  <Button
                    className="text-red-700 bg-red-100 hover:text-red-800 hover:bg-red-200"
                    onClick={() => {
                      setselectedPublisher(publisher);
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
              Bạn có chắc muốn xóa nhà xuất bản:{" "}
              <span className="italic text-red-500">
                {selected?.publisherName}
              </span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa nhà
              xuất bản này?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="hover:bg-red-600"
              onClick={async () => {
                setIsOpen(false);
                const res = await deletePublisher(selected?.id || 0);
                if (res.statusCode === 200) {
                  toast({
                    title: "Xóa sách thành công",
                    description: (
                      <>
                        <span className="font-bold italic">
                          {selected?.publisherName}
                        </span>{" "}
                        đã được xóa thành công
                      </>
                    ),
                    duration: 3000,
                  });
                } else {
                  toast({
                    title: "Xóa nhà xuất bản thất bại",
                    description: "Có lỗi xảy ra khi xóa nhà xuất bản",
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
