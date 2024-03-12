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
              <CardTitle>Mượn sách</CardTitle>
            </div>

            <Button>Thêm mượn</Button>
          </div>
        </CardHeader>
      </Card>
      <div className="flex items-center justify-center m-12 border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Mã mượn trả</TableHead>
              <TableHead>Số thẻ</TableHead>
              <TableHead>Mã nhân viên</TableHead>
              <TableHead>Ngày mượn</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">MT001</TableCell>
              <TableCell>TH001</TableCell>
              <TableCell>NV001</TableCell>
              <TableCell>2023-05-16</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">MT002</TableCell>
              <TableCell>TH002</TableCell>
              <TableCell>NV002</TableCell>
              <TableCell>2023-05-17</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">MT003</TableCell>
              <TableCell>TH003</TableCell>
              <TableCell>NV003</TableCell>
              <TableCell>2023-05-18</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">MT004</TableCell>
              <TableCell>TH004</TableCell>
              <TableCell>NV004</TableCell>
              <TableCell>2023-05-19</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">MT005</TableCell>
              <TableCell>TH005</TableCell>
              <TableCell>NV005</TableCell>
              <TableCell>2023-05-20</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
