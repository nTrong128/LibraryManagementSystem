import {Staff} from "@/components/component/staff";
import {Button} from "@/components/ui/button";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {Employee} from "@/type";
import {VenetianMask} from "lucide-react";
import Link from "next/link";

export default async function EmployeePage() {
  let employee: Employee[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/employees`,
      {
        method: "GET",
        next: {tags: ["list-employees"]},
        cache: "no-cache",
      }
    );

    const data = await res.json();
    employee = data.data;
    if (!data) return <div>Loading...</div>;
  } catch (error) {
    console.error("Error fetching books:", error);
  }
  return (
    <main>
      <Card className="flex-1">
        <CardHeader className="md:gap-4 bg-gray-200 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div className="flex gap-x-2">
              <VenetianMask />
              <CardTitle>Nhân viên</CardTitle>
            </div>

            <Link href={"/employee/new"}>
              <Button>Thêm nhân viên</Button>
            </Link>
          </div>
        </CardHeader>
      </Card>
      <Staff employees={employee} />
    </main>
  );
}
