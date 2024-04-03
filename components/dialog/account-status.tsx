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
import {ChangeStatusAccount} from "@/actions/account";
import {Button} from "../ui/button";

export function AccountStatus(prop: {employee: Employee}) {
  const employee = prop.employee;
  const newStatus = !employee.account.enabled;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {newStatus ? (
          <Button className="bg-green-500 text-white">Mở tài khoản</Button>
        ) : (
          <Button className="bg-blue-500 text-white">Khóa tài khoản</Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bạn có chắc muốn đổi tài khoản:{" "}
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
              const res = await ChangeStatusAccount(employee.id, newStatus);
              if (res.statusCode === 200) {
                toast({
                  title: "Đổi trạng thái thành công",
                  description: (
                    <>
                      <span className="font-bold italic">
                        Tài khoản {employee.id}
                      </span>{" "}
                      đã được thay đổi trạng thái.
                    </>
                  ),
                  duration: 3000,
                });
              } else {
                toast({
                  title: "Đổi trạng thái tài khoản thất bại",
                  description:
                    "Có lỗi xảy ra khi đổi trạng thái tài khoản. Có thể đây là tài khoản quản trị",
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
