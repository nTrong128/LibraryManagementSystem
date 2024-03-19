import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import {Employee} from "@/type";

export function Staff(prop: {employees: Employee[]}) {
  return (
    <Table className="border mt-10 mx-auto max-w-5xl">
      <TableHeader>
        <TableRow>
          <TableHead>Mã Nhân viên</TableHead>
          <TableHead>Họ và Tên</TableHead>
          <TableHead>Ngày Sinh</TableHead>
          <TableHead>Số điện thoại</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {prop.employees.map((employee: Employee) => (
          <TableRow key={employee.id}>
            <TableCell>{employee.id}</TableCell>
            <TableCell>{employee.fullName}</TableCell>
            <TableCell>
              {new Date(employee.birthDate).toLocaleDateString("vi-VN")}
            </TableCell>
            <TableCell>{employee.phoneNumber}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
