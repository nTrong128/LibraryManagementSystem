import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {PersonStanding} from "lucide-react";
import {Category} from "@/types";
import Link from "next/link";
import {getServerSession} from "next-auth";
import {authOptions} from "@/auth";
import {CategoryTable} from "@/components/component/category";

export default async function Category() {
  const session = await getServerSession(authOptions);

  let categories: Category[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`,
      {
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        method: "GET",
        next: {tags: ["list-categories"]},
        cache: "no-cache",
      }
    );

    const data = await res.json();
    categories = data.data;
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
              <PersonStanding />
              <CardTitle>Thể loại</CardTitle>
            </div>

            <Link href={"/categories/new"}>
              <Button>Thêm thể loại</Button>
            </Link>
          </div>
        </CardHeader>
      </Card>
      <div className=" mx-auto my-10 border max-w-3xl">
        <CategoryTable categories={categories} />
      </div>
    </main>
  );
}
