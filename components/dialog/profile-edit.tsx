import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import {Employee} from "@/types";
import {FilePenLine} from "lucide-react";
import {useState} from "react";
import {EditProfileForm} from "../form/edit-profile";
export default function EditProfileDialog(params: {employee: Employee}) {
  const employee = params.employee;
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-1/3 text-green-700 bg-green-200 hover:text-green-800 hover:bg-green-400">
          <FilePenLine /> Cập nhật thông tin
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cập nhật thông tin cho: {employee.fullName}</DialogTitle>
          <EditProfileForm employee={employee} open={open} setOpen={setOpen} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
