import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Reader} from "@/types";
import {useState} from "react";
import {ExtendLibraryCardForm} from "@/components/form/extend-library-card";

export function ExtendLibraryCard(params: {reader: Reader}) {
  const reader = params.reader;
  const [open, setOpen] = useState(false);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className=" w-full bg-green-500 hover:bg-green-600">
            Gia hạn thẻ
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gia hạn thẻ thư viện</DialogTitle>
            <DialogClose />
          </DialogHeader>
          <ExtendLibraryCardForm
            reader={reader}
            libraryCard={reader.libraryCard!}
            open={open}
            setOpen={setOpen}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
