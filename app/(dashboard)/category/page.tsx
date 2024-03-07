import {Author} from "@/components/component/author";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {PersonStanding} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export default function Category() {
  return (
    <main>
      <Card className="flex-1">
        <CardHeader className="md:gap-4 bg-gray-200 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div className="flex gap-x-2">
              <PersonStanding />
              <CardTitle>Thể loại</CardTitle>
            </div>

            <Button>Thêm thể loại</Button>
          </div>
        </CardHeader>
      </Card>
      <div className="flex items-center justify-center m-12 border">
        <Table className="w-1/3">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[140px]">Category Code</TableHead>
              <TableHead>Category Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">CTG001</TableCell>
              <TableCell>Running</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">CTG002</TableCell>
              <TableCell>Basketball</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">CTG003</TableCell>
              <TableCell>Tennis</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">CTG004</TableCell>
              <TableCell>Yoga & Fitness</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">CTG005</TableCell>
              <TableCell>Outdoor & Hiking</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
