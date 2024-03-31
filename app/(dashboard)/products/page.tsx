import {ProductTable} from "@/components/component/product";
import {Button} from "@/components/ui/button";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {Book} from "@/types";
import {BookOpen} from "lucide-react";
import Link from "next/link";
import {getServerSession} from "next-auth";
import {authOptions} from "@/auth";

export default async function ProductPage() {
  const session = await getServerSession(authOptions);
  let book: Book[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books`, {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`, // Update the property name to 'accessToken'
      },
      method: "GET",
      next: {tags: ["list-books"]},
      cache: "no-cache",
    });

    const data = await res.json();
    book = data.data;

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
              <BookOpen />
              <CardTitle>Sách</CardTitle>
            </div>
            <Link href="/products/new">
              <Button>Thêm sách</Button>
            </Link>
          </div>
        </CardHeader>
      </Card>
      {book.length === 0 ? (
        <div>Không có sách nào</div>
      ) : (
        <ProductTable book={book} />
      )}
    </main>
  );
}
