import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import {Book} from "@/type";

export function BookaholicPage({book}: {book: Book}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Reader ID</TableHead>
          <TableHead>Reader Name</TableHead>
          <TableHead>Address</TableHead>
          <TableHead className="text-right">Card Number</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">RD006</TableCell>
          <TableCell>John Doe</TableCell>
          <TableCell>202 Elm Lane</TableCell>
          <TableCell className="text-right">567890123</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
