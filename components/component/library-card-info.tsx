"use client";
import {Reader} from "@/types";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {ExtendLibraryCard} from "@/components/dialog/library-card-extend";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {CreateLibraryCardDialog} from "@/components/dialog/library-card-create";
import {useToast} from "@/components/ui/use-toast";
import {useState} from "react";
import {deleteLibraryCard} from "@/actions/library-card";

export default function LibraryCardInfo(params: {reader: Reader}) {
  const reader = params.reader;
  const router = useRouter();
  const {toast} = useToast();
  const [deActivate, setdeActivate] = useState(false);
  const [activate, setActivate] = useState(false);
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
            {reader.libraryCard.deleted && (
              <p className="text-red-500 italic font-semibold mb-2">
                Thẻ bị tạm khóa
              </p>
            )}

            <div className="flex gap-x-2">
              {(reader.libraryCard.deleted && (
                <Button
                  className="w-1/2 bg-green-500 hover:bg-green-600"
                  onClick={() => {
                    setActivate(true);
                  }}>
                  Mở khóa thẻ
                </Button>
              )) || (
                <Button
                  variant={"destructive"}
                  className="w-1/2"
                  onClick={() => {
                    setdeActivate(true);
                  }}>
                  Vô hiệu hóa thẻ
                </Button>
              )}

              <ExtendLibraryCard reader={reader} />
            </div>
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

      {/* DEACTIVATE */}
      <AlertDialog open={deActivate} onOpenChange={setdeActivate}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Bạn có chắc muốn vô hiệu hóa thẻ:{"  "}
              <span className="italic text-red-500">
                {reader?.libraryCard?.cardNumber} của đọc giả{" "}
                {reader.readerName}
              </span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              Người dùng này sẽ tạm thời không thể mượn sách
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              className="hover:bg-red-600"
              onClick={async () => {
                setdeActivate(false);
                const res = await deleteLibraryCard(reader?.id || 0);
                if (res.statusCode === 200) {
                  toast({
                    title: "Xóa thẻ thành công",
                    description: (
                      <>
                        <span className="font-bold italic">
                          Thẻ của {reader?.readerName}
                        </span>{" "}
                        đã được vô hiệu hóa thành công
                      </>
                    ),
                    duration: 3000,
                  });
                } else {
                  toast({
                    title: "Xóa thẻ thất bại",
                    description:
                      "Có lỗi xảy ra khi xóa thẻ, có thể thẻ này đang sử dụng",
                    duration: 3000,
                  });
                }
              }}>
              Tiếp tục
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ACTIVATE */}
      <AlertDialog open={activate} onOpenChange={setActivate}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Bạn có chắc muốn mở khóa thẻ:{"  "}
              <span className="italic text-green-500">
                {reader?.libraryCard?.cardNumber} của đọc giả{" "}
                {reader.readerName}
              </span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              Thẻ sẽ được mở khóa và đọc giả có thể mượn sách
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              className="hover:bg-green-600"
              onClick={async () => {
                setActivate(false);
                const res = await deleteLibraryCard(reader?.id || 0);
                if (res.statusCode === 200) {
                  toast({
                    title: "Mở khóa thẻ thành công",
                    description: (
                      <>
                        <span className="font-bold italic">
                          Thẻ của {reader?.readerName}
                        </span>{" "}
                        đã được mở khóa thành công
                      </>
                    ),
                    duration: 3000,
                  });
                } else {
                  toast({
                    title: "Mã khóa thẻ thất bại",
                    description: "Có lỗi xảy ra khi mở khóa thẻ",
                    duration: 3000,
                  });
                }
              }}>
              Tiếp tục
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
