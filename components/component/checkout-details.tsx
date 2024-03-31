"use client";
import {useRouter} from "next/navigation";
import {Button} from "../ui/button";
import {useState} from "react";
import {ReturnBook} from "@/actions/checkout-detail";
export function CheckOutDetailInfo(params: {checkoutDetails: any}) {
  const checkoutDetails = params.checkoutDetails;
  const router = useRouter();
  const [selected, setSelected] = useState<any>(null);
  return (
    <main className="m-4">
      <div className="flex items-center justify-between">
        <Button onClick={() => router.back()}>Quay lại</Button>
      </div>
      <div className="mx-auto my-4 max-w-3xl border p-4">
        <h1 className="text-3xl font-semibold text-center">
          Thông tin mượn sách
        </h1>
        {checkoutDetails.map((checkout: any, key: any) => (
          <div
            key={checkout.id}
            className="grid grid-cols-4 gap-x-5 border rounded-md p-4">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Mã sách:</span>
              <span>{checkout.book.id}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Tên sách:</span>
              <span>{checkout.book.bookName}</span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="font-semibold">Trạng thái:</span>
              <span>
                {(checkout.returned && (
                  <span className="text-green-500">Đã trả</span>
                )) || <span className="text-red-500">Chưa trả</span>}
              </span>
            </div>
            <div>
              {!checkout.returned && (
                <Button
                  className="bg-blue-500 text-blue-50 hover:bg-blue-700"
                  onClick={async () => {
                    setSelected(checkout);
                    await ReturnBook({
                      checkoutId: checkout.checkoutId,
                      bookId: checkout.book.id,
                    });
                  }}>
                  Trả sách
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
