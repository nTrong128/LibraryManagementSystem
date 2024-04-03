import {Author} from "@/types";
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
import {Input} from "@/components/ui/input";

import {Button} from "@/components/ui/button";

export function FormEditAuthor(prop: {
  author: Author;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const session = useSession();
  const accessToken = session?.data?.user.accessToken;

  const form = useForm({
    defaultValues: {
      authorName: prop.author.authorName,
      website: prop.author.website,
      note: prop.author.note,
    },
  });
  const {
    handleSubmit,
    control,
    formState: {isSubmitting},
  } = form;
  async function onSubmit(values: any) {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/authors/${prop.author.id}`,
        values,
        {headers: {Authorization: `Bearer ${accessToken}`}}
      );
      if (response.data.flag) {
        action("list-authors");
        alert("Cập nhật tác giả thành công");
        prop.setOpen(false);
      }
    } catch (error) {
      return <div>Failed to load</div>;
    }
  }
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="authorName"
          render={({field}) => (
            <FormItem>
              <FormLabel>Tên tác giả</FormLabel>
              <FormControl>
                <Input
                  required
                  {...field}
                  placeholder="Nhập tên tác giả"
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="website"
          render={({field}) => (
            <FormItem>
              <FormLabel>Trang web</FormLabel>
              <FormControl>
                <Input
                  required
                  {...field}
                  placeholder="Nhập địa chỉ trang web"
                  type="text"
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
                <Input
                  required
                  {...field}
                  placeholder="Nhập ghi chú về tác giả"
                  type="text"
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
