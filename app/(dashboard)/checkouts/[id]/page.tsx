import {Reader} from "@/types";
import {getServerSession} from "next-auth";
import {authOptions} from "@/auth";
import LibraryCardInfo from "@/components/component/library-card-info";
import {CheckOutDetailInfo} from "@/components/component/checkout-details";
export default async function ProductDetails({params}: {params: {id: string}}) {
  const session = await getServerSession(authOptions);
  let checkoutDetails: any;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/checkouts/${params.id}/details`,
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
    checkoutDetails = data.data;

    if (!checkoutDetails)
      return (
        <div className="text-center text-4xl">Trang này không tồn tài</div>
      );
  } catch (error) {
    console.error("Error fetching reader:", error);
  }

  return checkoutDetails ? (
    <CheckOutDetailInfo checkoutDetails={checkoutDetails} />
  ) : (
    <div className="text-center text-4xl">Có lỗi xảy ra</div>
  );
}
