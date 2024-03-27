import {Staff} from "@/components/component/staff";
import {Button} from "@/components/ui/button";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {Employee} from "@/types";
import {VenetianMask} from "lucide-react";
import Link from "next/link";
import {getServerSession} from "next-auth";
import {authOptions} from "@/auth";

export default async function EmployeePage() {
  const session = await getServerSession(authOptions);

  let employee: Employee[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/employees`,
      {
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`, // Update the property name to 'accessToken'
        },
        method: "GET",
        next: {tags: ["list-employees"]},
        cache: "no-cache",
      }
    );
    const data = await res.json();

    employee = data.data;
    if (!employee) return <div>Loading...</div>;
  } catch (error) {
    console.error("Error fetching books:", error);
    return <div>Loading...</div>;
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

            <Link href={"/employees/new"}>
              <Button>Thêm nhân viên</Button>
            </Link>
          </div>
        </CardHeader>
      </Card>
      <Staff employees={employee} />
    </main>
  );
}
