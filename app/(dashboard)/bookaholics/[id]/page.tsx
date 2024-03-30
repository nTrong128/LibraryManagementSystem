import {Reader} from "@/types";
import {getServerSession} from "next-auth";
import {authOptions} from "@/auth";
import LibraryCardInfoDialog from "@/components/component/library-card-info";
export default async function ProductDetails({params}: {params: {id: string}}) {
  const session = await getServerSession(authOptions);
  let reader: Reader | null = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/readers/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        method: "GET",
        next: {tags: ["list-readers"]},
        cache: "no-cache",
      }
    );

    const data = await res.json();
    reader = data.data;

    if (!reader)
      return (
        <div className="text-center text-4xl">Trang này không tồn tài</div>
      );
  } catch (error) {
    console.error("Error fetching reader:", error);
  }

  return reader ? (
    <LibraryCardInfoDialog reader={reader} />
  ) : (
    <div className="text-center text-4xl">Có lỗi xảy ra</div>
  );
}
