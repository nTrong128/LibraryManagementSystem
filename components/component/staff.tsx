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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Mã Nhân viên</TableHead>
          <TableHead>Họ và Tên</TableHead>
          <TableHead>Ngày Sinh</TableHead>
          <TableHead>Số điện thoại</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {prop.employees.map((employee: Employee) => (
          <TableRow key={employee.employeeId}>
            <TableCell>{employee.employeeId}</TableCell>
            <TableCell>{employee.fullName}</TableCell>
            <TableCell>{employee.birthDate}</TableCell>
            <TableCell>{employee.phoneNumber}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
