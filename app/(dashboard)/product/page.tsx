import {Button} from "@/components/ui/button";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import {BookOpen} from "lucide-react";

export default function ProductPage() {
  return (
    <main className="m-2">
      <Card className="flex-1">
        <CardHeader className="md:gap-4 bg-gray-200 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div className="flex gap-x-2">
              <BookOpen />
              <CardTitle>Sách</CardTitle>
            </div>

            <Button>Thêm sách</Button>
          </div>
        </CardHeader>
      </Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Book ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Author ID</TableHead>
            <TableHead>Category ID</TableHead>
            <TableHead>Publisher ID</TableHead>
            <TableHead>Publication Year</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">B001</TableCell>
            <TableCell>The Alchemist</TableCell>
            <TableCell>A001</TableCell>
            <TableCell>C001</TableCell>
            <TableCell>P001</TableCell>
            <TableCell>1988</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">B002</TableCell>
            <TableCell>The Catcher in the Rye</TableCell>
            <TableCell>A002</TableCell>
            <TableCell>C002</TableCell>
            <TableCell>P002</TableCell>
            <TableCell>1951</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">B003</TableCell>
            <TableCell>To Kill a Mockingbird</TableCell>
            <TableCell>A003</TableCell>
            <TableCell>C003</TableCell>
            <TableCell>P003</TableCell>
            <TableCell>1960</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">B004</TableCell>
            <TableCell>1984</TableCell>
            <TableCell>A004</TableCell>
            <TableCell>C004</TableCell>
            <TableCell>P004</TableCell>
            <TableCell>1949</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">B005</TableCell>
            <TableCell>The Great Gatsby</TableCell>
            <TableCell>A005</TableCell>
            <TableCell>C005</TableCell>
            <TableCell>P005</TableCell>
            <TableCell>1925</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </main>
  );
}
