"use client";
import {Reader} from "@/types";

import {ExtendLibraryCard} from "@/components/dialog/library-card-extend";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {CreateLibraryCardDialog} from "@/components/dialog/library-card-create";

export default function LibraryCardInfo(params: {reader: Reader}) {
  const reader = params.reader;
  const router = useRouter();
  return (
    <main className="m-4">
      <Button className="w-1/6" onClick={() => router.back()}>
        Quay lại
      </Button>
      <div className="mx-auto my-4 max-w-3xl border p-4">
        <h1 className="text-3xl font-semibold text-center">
          Thông tin thẻ thư viện của: {reader.readerName}
        </h1>
        {(reader.libraryCard && (
          <div className="flex flex-col gap-y-3 pt-6">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Mã thẻ:</span>
              <span>{reader.libraryCard.cardNumber}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Ngày tạo:</span>
              <span>
                {new Date(reader.libraryCard.startDate).toLocaleDateString(
                  "vi-VN"
                )}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="font-semibold">Ngày hết hạn:</span>
              <span>
                {new Date(reader.libraryCard.expirationDate).toLocaleDateString(
                  "vi-VN"
                )}
              </span>
            </div>
            <div>
              {(reader.libraryCard.note && (
                <div>
                  <span className="font-semibold">Ghi chú: </span>
                  <span>{reader.libraryCard.note}</span>
                </div>
              )) || <></>}
            </div>
            {new Date(reader.libraryCard.expirationDate) < new Date() && (
              <p className="text-red-500 italic font-semibold mb-2">
                Thẻ đã quá hạn
              </p>
            )}
            <ExtendLibraryCard reader={reader} />
          </div>
        )) || (
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-semibold my-2">
              Chưa có thẻ thư viện
            </h1>
            <CreateLibraryCardDialog reader={reader} />
          </div>
        )}
      </div>
    </main>
  );
}
