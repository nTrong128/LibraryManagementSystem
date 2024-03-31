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
import {FilePenLine} from "lucide-react";
import {useState} from "react";
export default function CreateAccountDialog(params: {employee: Employee}) {
  const employee = params.employee;
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-2/3 text-green-700 bg-green-100 hover:text-green-800 hover:bg-green-200">
          <FilePenLine /> Tạo tài khoản
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Tạo tài khoản hệ thống cho: {employee.fullName}
          </DialogTitle>
          <DialogDescription>
            Nhập các thông tin dưới đây để tạo tài khoản cho nhân viên
          </DialogDescription>
          <CreateAccountForm
            employee={employee}
            open={open}
            setOpen={setOpen}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
