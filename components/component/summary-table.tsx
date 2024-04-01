import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableFooter,
  TableRow,
} from "../ui/table";
export function SummaryTable(params: {data: any; header: any; columns: any}) {
  const data = params.data;
  const columns = params.columns;
  const header = params.header;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column: any, index: number) => (
            <TableHead className={`w-1/${header.length}`} key={index}>
              {column}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row: any, index: number) => (
          <TableRow key={index}>
            {header.map((column: any, index: number) => (
              <TableCell key={index}>{row[column]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
