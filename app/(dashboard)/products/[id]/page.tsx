import {Book} from "@/types";
import {getServerSession} from "next-auth";
import {authOptions} from "@/auth";
import {BookDetail} from "@/components/component/book-detail";
export default async function ProductDetails({params}: {params: {id: string}}) {
  const session = await getServerSession(authOptions);
  let book: Book | null = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/books/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`, // Update the property name to 'accessToken'
        },
        method: "GET",
        next: {tags: ["list-books"]},
        cache: "no-cache",
      }
    );

    const data = await res.json();
    book = data.data;

    if (!book)
      return (
        <div className="text-center text-4xl">Trang này không tồn tài</div>
      );
  } catch (error) {
    console.error("Error fetching book:", error);
  }

  return book ? (
    <BookDetail book={book} />
  ) : (
    <div className="text-center text-4xl">Có lỗi xảy ra</div>
  );
}
