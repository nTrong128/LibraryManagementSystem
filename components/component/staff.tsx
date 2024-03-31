"use client";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import {Employee} from "@/types";
import {Button} from "@/components/ui/button";
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
import {deleteEmployee} from "@/actions/employee";
import CreateAccountDialog from "@/components/dialog/account-create";
import {AccountStatus} from "../dialog/account-status";
import {Input} from "../ui/input";

export function Staff(prop: {employees: Employee[]}) {
  const {toast} = useToast();
  const [selected, setselected] = useState<Employee>();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const filteredEmployees = prop.employees.filter((employee) => {
    return (
      employee.fullName.toLowerCase().includes(search.toLowerCase()) ||
      employee.id.toString().includes(search)
    );
  });
  return (
    <>
      <Input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        value={search}
        className="mx-auto mt-10 w-2/3 rounded-md"
        placeholder="Tìm kiếm nhân viên"
      />
      <Table className="border mt-10 mx-auto max-w-5xl">
        <TableHeader>
          <TableRow>
            <TableHead>Mã Nhân viên</TableHead>
            <TableHead>Họ và Tên</TableHead>
            <TableHead>Ngày Sinh</TableHead>
            <TableHead>Số điện thoại</TableHead>
            <TableHead>Tài khoản</TableHead>
            <TableHead>Tác vụ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEmployees.map((employee: Employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.id}</TableCell>
              <TableCell>{employee.fullName}</TableCell>
              <TableCell>
                {new Date(employee.birthDate).toLocaleDateString("vi-VN")}
              </TableCell>
              <TableCell>{employee.phoneNumber}</TableCell>
              {employee.account === null ? (
                <TableCell>
                  <CreateAccountDialog employee={employee} />
                </TableCell>
              ) : (
                <TableCell className="flex flex-row items-center justify-between gap-2">
                  <div>
                    <p>Tên tài khoản: {employee.account.username}</p>
                    <p>Quyền: {employee.account.role.toUpperCase()}</p>
                    {employee.account.enabled ? (
                      <p className="text-green-500">Đang hoạt động </p>
                    ) : (
                      <p className="text-red-500">Tạm khóa</p>
                    )}
                  </div>
                  <div>
                    <AccountStatus employee={employee} />
                  </div>
                </TableCell>
              )}
              <TableCell>
                <div className="flex gap-x-2">
                  {/* <Button>Sửa</Button> */}
                  <Button
                    className="text-red-700 bg-red-100 hover:text-red-800 hover:bg-red-200"
                    onClick={() => {
                      setselected(employee);
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
              Bạn có chắc muốn xóa nhân viên:{" "}
              <span className="italic text-red-500">{selected?.fullName}</span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa nhân
              viên này?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="hover:bg-red-600"
              onClick={async () => {
                setIsOpen(false);
                const res = await deleteEmployee(selected?.id || 0);
                if (res.statusCode === 200) {
                  toast({
                    title: "Xóa sách thành công",
                    description: (
                      <>
                        <span className="font-bold italic">
                          {selected?.fullName}
                        </span>{" "}
                        đã được xóa thành công
                      </>
                    ),
                    duration: 3000,
                  });
                } else {
                  toast({
                    title: "Xóa nhân viên thất bại",
                    description: "Có lỗi xảy ra khi xóa nhân viên",
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
