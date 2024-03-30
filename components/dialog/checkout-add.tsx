"use client";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import {FilePenLine} from "lucide-react";
import {useState} from "react";
import {CreateCheckOutForm} from "../form/create-checkout";

export default function CreateCheckOutDialog(params: {books: any}) {
  const books = params.books;
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <FilePenLine className="me-4" /> Thêm mượn sách
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm mượn sách mới</DialogTitle>
        </DialogHeader>
        <CreateCheckOutForm books={books} open={open} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
