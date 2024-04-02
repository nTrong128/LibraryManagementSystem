import {Employee} from "@/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import {toast} from "../ui/use-toast";
import {deleteAccount} from "@/actions/account";
import {Button} from "../ui/button";

export function AccountDelete(prop: {employee: Employee}) {
  const employee = prop.employee;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-500 text-white">Xóa tài khoản</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bạn có chắc muốn xóa tài khoản:{" "}
            <span className="italic text-red-500">
              {employee?.account.username}
            </span>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction
            className="hover:bg-red-600"
            onClick={async () => {
              const res = await deleteAccount(employee.id);
              if (res.statusCode === 200) {
                toast({
                  title: "Đổi trạng thái thành công",
                  description: (
                    <>
                      Tài khoản của
                      <span className="font-bold">{employee.fullName}</span> đã
                      được xóa thành công.
                    </>
                  ),
                  duration: 3000,
                });
              } else {
                toast({
                  title: "Xóa tài khoản thất bại",
                  description:
                    "Có lỗi xảy ra khi xóa tài khoản. Có thể đây là tài khoản quản trị",
                  duration: 3000,
                });
              }
            }}>
            Tiếp tục
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
