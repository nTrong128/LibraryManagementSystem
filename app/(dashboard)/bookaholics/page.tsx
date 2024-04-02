import {Card, CardTitle, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {UserSearch} from "lucide-react";
import {Reader} from "@/types";
import Link from "next/link";
import {BookaholicTable} from "@/components/component/bookaholic";
import {getServerSession} from "next-auth";
import {authOptions} from "@/auth";

export default async function Bookaholic() {
  const session = await getServerSession(authOptions);

  let readers: Reader[] = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/readers`, {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`, // Update the property name to 'accessToken'
      },
      method: "GET",
      next: {tags: ["list-readers"]},
      cache: "no-cache",
    });

    const data = await res.json();
    readers = data.data;

    if (!readers)
      return (
        <div className="pt-10 text-5xl mx-auto text-center">
          Something went wrong!
        </div>
      );
  } catch (error) {
    console.error("Error fetching readers:", error);
    <div className="pt-10 text-5xl mx-auto text-center">
      Something went wrong!
    </div>;
  }
  return (
    <main>
      <Card className="flex-1">
        <CardHeader className="md:gap-4 bg-gray-200 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div className="flex gap-x-2">
              <UserSearch />
              <CardTitle>Độc giả</CardTitle>
            </div>

            <Link href={"/bookaholics/new"}>
              <Button>Thêm độc giả</Button>
            </Link>
          </div>
        </CardHeader>
      </Card>

      {(readers.length === 0 && (
        <div className="text-3xl font-semibold text-center m-4">
          Không có độc giả nào
        </div>
      )) || <BookaholicTable readers={readers} />}
    </main>
  );
}
