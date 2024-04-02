import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import {Employee} from "@/types";
import {useState} from "react";
import {ChangePasswordForm} from "../form/password";
export default function ChangePasswordDialog(params: {employee: Employee}) {
  const employee = params.employee;
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="1/3">Đổi mật khẩu</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cập nhật thông tin cho: {employee.fullName}</DialogTitle>
          <ChangePasswordForm
            employee={employee}
            open={open}
            setOpen={setOpen}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
