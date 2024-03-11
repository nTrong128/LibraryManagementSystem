
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"

export function Staff() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Staff ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Born</TableHead>
          <TableHead className="text-right">Card Number</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">NV001</TableCell>
          <TableCell>John Doe</TableCell>
          <TableCell>1990-05-15</TableCell>
          <TableCell className="text-right">123456789</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">NV002</TableCell>
          <TableCell>Jane Smith</TableCell>
          <TableCell>1985-12-20</TableCell>
          <TableCell className="text-right">987654321</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">NV003</TableCell>
          <TableCell>Michael Johnson</TableCell>
          <TableCell>1978-08-10</TableCell>
          <TableCell className="text-right">456789012</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">NV004</TableCell>
          <TableCell>Emily Wilson</TableCell>
          <TableCell>1995-02-28</TableCell>
          <TableCell className="text-right">789012345</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">NV005</TableCell>
          <TableCell>David Lee</TableCell>
          <TableCell>1989-11-03</TableCell>
          <TableCell className="text-right">567890123</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
