import {Card, CardTitle, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {UserSearch} from "lucide-react";
import {Reader} from "@/type";
import Link from "next/link";
import {BookaholicTable} from "@/components/component/bookaholic";

export default async function Bookaholic() {
  let readers: Reader[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/readers`, {
      method: "GET",
      next: {tags: ["list-readers"]},
      cache: "no-cache",
    });

    const data = await res.json();
    readers = data.data;

    if (!data) return <div>Loading...</div>;
  } catch (error) {
    console.error("Error fetching readers:", error);
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

            <Link href={"/bookaholic/new"}>
              <Button>Thêm độc giả</Button>
            </Link>
          </div>
        </CardHeader>
      </Card>
      <BookaholicTable readers={readers} />
    </main>
  );
}
