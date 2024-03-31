import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {PersonStanding} from "lucide-react";
import Link from "next/link";
import {AuthorTable} from "@/components/component/author";
import {Author} from "@/types";
import {authOptions} from "@/auth";
import {getServerSession} from "next-auth";

export default async function AuthorPage() {
  const session = await getServerSession(authOptions);

  let authors: Author[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/authors`, {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
      method: "GET",
      next: {tags: ["list-authors"]},
      cache: "no-cache",
    });

    const data = await res.json();
    authors = data.data;
    if (!data) return <div>Loading...</div>;
  } catch (error) {
    console.error("Error fetching authors:", error);
  }
  return (
    <main>
      <Card className="flex-1">
        <CardHeader className="md:gap-4 bg-gray-200 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div className="flex gap-x-2">
              <PersonStanding />
              <CardTitle>Tác giả</CardTitle>
            </div>
            <Link href={"/authors/new"}>
              <Button>Thêm tác giả</Button>
            </Link>
          </div>
        </CardHeader>
      </Card>
      {authors.length === 0 ? (
        <div>Không có tác giả nào</div>
      ) : (
        <AuthorTable authors={authors} />
      )}
    </main>
  );
}
