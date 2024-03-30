import {CreateAccountForm} from "@/components/form/create-account";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import {Employee} from "@/types";
import {Edit, FilePenLine} from "lucide-react";
import {useState} from "react";
import {EditProfileForm} from "../form/edit-profile";
export default function EditProfileDialog(params: {employee: Employee}) {
  const employee = params.employee;
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-1/6 text-green-700 bg-green-100 hover:text-green-800 hover:bg-green-200">
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
