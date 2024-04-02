"use client";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {useSession} from "next-auth/react";
import {useForm} from "react-hook-form";
import axios from "axios";
import action from "@/actions/action";

import {Button} from "@/components/ui/button";

import {Book, Reader} from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {useState} from "react";
import {ScrollArea} from "@/components/ui/scroll-area";

export function CreateCheckOutForm(prop: {
  books: Book[];
  readers: Reader[];
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const readers = prop.readers.filter((reader) => reader.libraryCard);
  const session = useSession();
  const accessToken = session?.data?.user.accessToken;
  const employeeId = session?.data?.user.id;

  const [borrowBook, setBorrowBook] = useState<Book[]>([]);
  const [error, setError] = useState("");

  const addToBorrowBook = (book: Book) => {
    if (borrowBook.length >= 5) {
      setError("Số lượng sách mượn không được vượt quá 5 cuốn");
      return;
    }

    if (borrowBook.find((item) => item.id === book.id)) return;
    setBorrowBook([...borrowBook, book]);
  };
  const removeFromBorrowBook = (book: Book) => {
    setError("");
    setBorrowBook(borrowBook.filter((item) => item.id !== book.id));
  };
  const form = useForm({});
  const {
    handleSubmit,
    control,
    formState: {isSubmitting},
  } = form;
  async function onSubmit(values: any) {
    if (borrowBook.length < 1) {
      setError("Chưa chọn sách mượn");
      return;
    }
    const checkoutValues = {
      cardNumber: values.cardNumber,
      employeeId: employeeId,
    };
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/checkouts`,
        checkoutValues,
        {headers: {Authorization: `Bearer ${accessToken}`}}
      );
      if (response.data.flag) {
        action("list-checkouts");
        borrowBook.map(async (book) => {
          await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/checkouts/${response.data.data.id}/details/${book.id}`,
            {
              checkoutId: response.data.data.id,
              bookId: book.id,
            },
            {headers: {Authorization: `Bearer ${accessToken}`}}
          );
        });

        prop.setOpen(false);
      }
    } catch (error) {
      const responseError = error as {response: {data: {message: string}}};
      setError(responseError.response.data.message);
    }
  }
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="cardNumber"
          render={({field}) => (
            <FormItem>
              <FormLabel>Người mượn</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger {...field}>
                    <SelectValue placeholder="Chọn người mượn" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {readers.map((reader: Reader) => (
                    <SelectItem
                      key={reader.id}
                      value={String(reader.libraryCard?.cardNumber)}>
                      {reader.readerName}, mã thẻ:{" "}
                      {reader.libraryCard?.cardNumber}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button className="w-full" variant={"outline"}>
              Chọn sách
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent asChild>
            <ScrollArea className="h-72 w-48 rounded-md border">
              {prop.books.map((book) => (
                <DropdownMenuItem
                  key={book.id}
                  onClick={() => addToBorrowBook(book)}>
                  {book.bookName}
                </DropdownMenuItem>
              ))}
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>

        {borrowBook.length >= 1 && (
          <div>
            <h3 className="text-lg font-bold">Danh sách sách mượn</h3>
            <div className="flex flex-col gap-y-2 my-2">
              {borrowBook.map((book) => (
                <div className="flex justify-between" key={book.id}>
                  <span>{book.bookName}</span>{" "}
                  <Button
                    variant={"destructive"}
                    onClick={() => removeFromBorrowBook(book)}>
                    Xóa
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        {error && (
          <p className="text-red-500 text-center font-semibold bg-red-100 rounded p-2">
            {error}
          </p>
        )}

        <Button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
          type="submit"
          disabled={isSubmitting}>
          Tạo đơn mượn
        </Button>
      </form>
    </Form>
  );
}
