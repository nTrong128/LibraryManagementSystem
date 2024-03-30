import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Reader} from "@/types";
import {useState} from "react";
import {CreateLibraryCardForm} from "@/components/form/create-library-card";

export function CreateLibraryCardDialog(params: {reader: Reader}) {
  const reader = params.reader;
  const [open, setOpen] = useState(false);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="text-green-700 bg-green-100 hover:text-green-800 hover:bg-green-200 w-2/5 mx-auto">
            Tạo thẻ thư viện
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tạo thẻ thư viện</DialogTitle>
            <DialogClose />
          </DialogHeader>
          <CreateLibraryCardForm
            reader={reader}
            open={open}
            setOpen={setOpen}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
