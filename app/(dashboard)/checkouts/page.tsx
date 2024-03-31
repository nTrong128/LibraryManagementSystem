import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {PersonStanding} from "lucide-react";
import {Book, CheckOut, LibraryCard} from "@/types";
import {CheckOutTable} from "@/components/component/checkout";
import {getServerSession} from "next-auth";
import {authOptions} from "@/auth";
import CreateCheckOutDialog from "@/components/dialog/checkout-add";
export default async function CheckOut() {
  const session = await getServerSession(authOptions);

  let checkouts: CheckOut[] = [];
  let books: Book[] = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/checkouts`,
      {
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        method: "GET",
        next: {tags: ["list-checkouts"]},
        cache: "no-cache",
      }
    );
    const res_books = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/books`,
      {
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        method: "GET",
        next: {tags: ["list-library-cards"]},
        cache: "no-cache",
      }
    );
    const data_card = await res_books.json();
    books = data_card.data;

    const data = await res.json();
    checkouts = data.data;

    if (!data) return <div>Loading...</div>;
  } catch (error) {
    console.error("Error fetching checkouts:", error);
    return <div>Failed to load</div>;
  }
  return (
    <main>
      <Card className="flex-1">
        <CardHeader className="md:gap-4 bg-gray-200 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div className="flex gap-x-2">
              <PersonStanding />
              <CardTitle>Mượn sách</CardTitle>
            </div>

            <CreateCheckOutDialog books={books} />
          </div>
        </CardHeader>
      </Card>
      <div className=" m-12 border max-w-6xl mx-auto">
        <CheckOutTable checkouts={checkouts} />
      </div>
    </main>
  );
}
