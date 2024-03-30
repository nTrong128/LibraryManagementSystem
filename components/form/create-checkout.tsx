import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {useSession} from "next-auth/react";
import {set, useForm} from "react-hook-form";
import axios from "axios";
import action from "@/actions/action";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Book} from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {useState} from "react";

export function CreateCheckOutForm(prop: {
  books: Book[];
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
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
      console.log(response);
    } catch (error) {
      console.log("Error create account for employee", error);
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
              <FormLabel>Mã thẻ thư viện</FormLabel>
              <FormControl>
                <Input required {...field} placeholder="Nhập mã thẻ thư viện" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-full" variant={"outline"}>
              Chọn sách
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {prop.books.map((book) => (
              <DropdownMenuItem
                key={book.id}
                onClick={() => addToBorrowBook(book)}>
                {book.bookName}
              </DropdownMenuItem>
            ))}
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
          Tạo thẻ
        </Button>
      </form>
    </Form>
  );
}
