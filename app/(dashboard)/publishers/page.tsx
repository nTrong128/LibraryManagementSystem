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
import useSWR from "swr";
import {Publisher} from "@/types";
import Link from "next/link";
import {PublisherTable} from "@/components/component/publisher";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/auth";
const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default async function Category() {
  const session = await getServerSession(authOptions);
  let publisher: Publisher[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/publishers`,
      {
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`, // Update the property name to 'accessToken'
        },
        method: "GET",
        next: {tags: ["list-publihsers"]},
        cache: "no-cache",
      }
    );

    const data = await res.json();
    publisher = data.data;

    if (!data) return <div>Something went wrong...</div>;
  } catch (error) {
    console.error("Error fetching books:", error);
    <div>Something went wrong...</div>;
  }

  return (
    <main>
      <Card className="flex-1">
        <CardHeader className="md:gap-4 bg-gray-200 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div className="flex gap-x-2">
              <PersonStanding />
              <CardTitle>Nhà xuất bản</CardTitle>
            </div>

            <Link href={"/publishers/new"}>
              <Button>Thêm nhà xuất bản</Button>
            </Link>
          </div>
        </CardHeader>
      </Card>
      {publisher.length === 0 ? (
        <div>Không có nhà xuất bản nào</div>
      ) : (
        <div className=" my-10 border mx-10">
          <PublisherTable publishers={publisher} />
        </div>
      )}
    </main>
  );
}
