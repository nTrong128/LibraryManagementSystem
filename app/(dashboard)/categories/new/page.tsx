"use client";
import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import axios from "axios";
import {useSession} from "next-auth/react";
import action from "@/actions/action";

export default function NewCategoryPage() {
  const session = useSession();
  const accessToken = session?.data?.user.accessToken;
  const router = useRouter();

  const form = useForm();
  const {
    handleSubmit,
    control,
    formState: {isSubmitting},
  } = form;
  async function onSubmit(values: any) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`,
        values,
        {headers: {Authorization: `Bearer ${accessToken}`}}
      );
      if (response.status === 201) {
        action("list-categories");
        alert("Thêm thể loại thành công");
        router.back();
      }
    } catch (error) {
      console.log("Error creating category", error);
      return <div>Failed to load</div>;
    }
  }
  return (
    <main className="m-auto my-10 max-w-3xl space-y-10">
      <div>
        <h1 className="text-3xl font-semibold text-center">
          Thêm thể loại sách
        </h1>
        <p className="mt-2 text-sm text-gray-500 text-center">
          Thêm thể loại sách mới vào hệ thống.
        </p>
      </div>
      <div className="rounded-lg border p-4">
        <Form {...form}>
          <div className="">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <FormField
                control={control}
                name="categoryName"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Tên Thể loại</FormLabel>
                    <FormControl>
                      <Input
                        required
                        {...field}
                        placeholder="Nhập tên thể loại"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-1/3 block mx-auto"
                type="submit"
                disabled={isSubmitting}>
                Thêm
              </Button>
            </form>
          </div>
        </Form>
      </div>
    </main>
  );
}
