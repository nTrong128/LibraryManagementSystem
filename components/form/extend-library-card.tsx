import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {useSession} from "next-auth/react";
import {useForm} from "react-hook-form";
import axios from "axios";
import action from "@/actions/action";
import {Reader} from "@/types";

import {Button} from "@/components/ui/button";
import {useState} from "react";
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";

export function ExtendLibraryCardForm(prop: {
  reader: Reader;
  libraryCard: any;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  type ValuePiece = Date | null;

  type Value = ValuePiece | [ValuePiece, ValuePiece];
  const [value, onChange] = useState<Value>(new Date());

  const session = useSession();
  const accessToken = session?.data?.user.accessToken;

  const form = useForm({
    defaultValues: {
      cardDuration: prop.libraryCard.cardDuration,
      note: prop.libraryCard.note,
    },
  });
  const {
    handleSubmit,
    control,
    formState: {isSubmitting},
  } = form;
  async function onSubmit(values: any) {
    try {
      console.log("values", values);
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/readers/${prop.reader.id}/library-cards`,
        values,
        {headers: {Authorization: `Bearer ${accessToken}`}}
      );
      if (response.data.flag) {
        action("list-readers");
        alert("Cập nhật thẻ thư viện thành công");
        prop.setOpen(false);
      }
      console.log(response);
    } catch (error) {
      console.log("Error editing library cards", error);
    }
  }
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="cardDuration"
          render={({field}) => (
            <FormItem>
              <FormLabel>Số tháng gia hạn thêm (tính từ hôm nay)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  required
                  {...field}
                  placeholder="Nhập số tháng gia hạn"
                  min={1}
                  step={1}
                  defaultValue={1}
                  max={24}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="note"
          render={({field}) => (
            <FormItem>
              <FormLabel>Ghi chú</FormLabel>
              <FormControl>
                <Textarea
                  required
                  {...field}
                  placeholder="Nhập ghi chú của thẻ"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
          type="submit"
          disabled={isSubmitting}>
          Cập nhật
        </Button>
      </form>
    </Form>
  );
}
