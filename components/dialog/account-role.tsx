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
import {changeRole} from "@/actions/account";
import {Button} from "../ui/button";

export function AccountRole(prop: {employee: Employee}) {
  const employee = prop.employee;
  const role = employee.account.role;
  const newRole = role === "admin" ? "user" : "admin";
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {role === "admin" ? (
          <Button className="bg-green-500 text-white">USER</Button>
        ) : (
          <Button className="bg-green-500 text-white">ADMIN</Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bạn có chắc muốn đổi tài khoản:{" "}
            <span className=" text-green-500">
              {employee?.account.username} thành {newRole.toUpperCase()}
            </span>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction
            className="hover:bg-red-600"
            onClick={async () => {
              const res = await changeRole(employee.id, newRole);
              console.log(res);
              if (res.statusCode === 200) {
                toast({
                  title: "Đổi quyền thành công",
                  description: (
                    <>
                      <span className="font-bold italic">
                        Tài khoản của {employee.fullName}
                      </span>{" "}
                      đã được thay đổi quyền.
                    </>
                  ),
                  duration: 3000,
                });
              } else {
                toast({
                  title: "Đổi quyền không thành công",
                  description: "Có lỗi xảy ra khi đổi quyền tài khoản.",
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
