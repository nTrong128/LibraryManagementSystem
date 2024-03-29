import {Category} from "@/types";
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

export function FormEditCategory(prop: {
  category: Category;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const session = useSession();
  const accessToken = session?.data?.user.accessToken;

  const form = useForm({
    defaultValues: {
      categoryName: prop.category.categoryName,
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/${prop.category.id}`,
        values,
        {headers: {Authorization: `Bearer ${accessToken}`}}
      );
      if (response.data.flag) {
        action("list-authors");
        alert("Cập nhật thể loại thành công");
        prop.setOpen(false);
      }
      console.log(response);
    } catch (error) {
      console.log("Error editing category", error);
    }
  }
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="categoryName"
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
