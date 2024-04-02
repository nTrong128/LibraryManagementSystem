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

export function CreateLibraryCardForm(prop: {
  reader: Reader;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  type ValuePiece = Date | null;

  type Value = ValuePiece | [ValuePiece, ValuePiece];
  const [value, onChange] = useState<Value>(new Date());

  const session = useSession();
  const accessToken = session?.data?.user.accessToken;

  const form = useForm({});
  const {
    handleSubmit,
    control,
    formState: {isSubmitting},
  } = form;
  async function onSubmit(values: any) {
    if (!values.note) {
      values.note = "";
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/readers/${prop.reader.id}/library-cards`,
        values,
        {headers: {Authorization: `Bearer ${accessToken}`}}
      );
      if (response.data.flag) {
        action("list-readers");
        alert("Tạo thẻ thư viện thành công");
        prop.setOpen(false);
      }
    } catch (error) {
      console.log("Error create library cards", error);
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
              <FormLabel>Số tháng </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  required
                  {...field}
                  placeholder="Nhập số tháng gia hạn"
                  min={1}
                  step={1}
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
                <Textarea {...field} placeholder="Nhập ghi chú của thẻ" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
