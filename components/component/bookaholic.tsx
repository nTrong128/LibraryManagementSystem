
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"

export function BookaholicPage() {
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
          <TableCell className="font-medium">RD001</TableCell>
          <TableCell>John Doe</TableCell>
          <TableCell>123 Apple Street</TableCell>
          <TableCell className="text-right">234567890</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">RD002</TableCell>
          <TableCell>Jane Smith</TableCell>
          <TableCell>456 Orange Avenue</TableCell>
          <TableCell className="text-right">123456789</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">RD003</TableCell>
          <TableCell>Michael Johnson</TableCell>
          <TableCell>789 Pear Road</TableCell>
          <TableCell className="text-right">345678901</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">RD004</TableCell>
          <TableCell>Emily Wilson</TableCell>
          <TableCell>101 Pine Blvd</TableCell>
          <TableCell className="text-right">456789012</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">RD005</TableCell>
          <TableCell>David Lee</TableCell>
          <TableCell>202 Elm Lane</TableCell>
          <TableCell className="text-right">567890123</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
