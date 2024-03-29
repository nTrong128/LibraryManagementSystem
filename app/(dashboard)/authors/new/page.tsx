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
import action from "@/actions/action";
import {useSession} from "next-auth/react";

export default function NewProductPage() {
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/authors`,
        values,
        {headers: {Authorization: `Bearer ${accessToken}`}}
      );
      if (response.status === 201) {
        action("list-authors");
        alert("Thêm tác giả thành công");
        router.back();
      }
    } catch (error) {
      console.log("Error creating author", error);
    }
  }
  return (
    <main className="m-4">
      <Button className="w-1/6" onClick={() => router.back()}>
        Quay lại
      </Button>
      <div className="m-auto my-10 max-w-3xl space-y-10">
        <div>
          <h1 className="text-3xl font-semibold text-center">
            Thêm tác giả mới
          </h1>
          <p className="mt-2 text-sm text-gray-500 text-center">
            Thêm tác giả mới vào hệ thống.
          </p>
        </div>
        <div className="rounded-lg border p-4">
          <Form {...form}>
            <div className="">
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
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input
                          required
                          {...field}
                          placeholder="Nhập địa chỉ website"
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
                      <FormLabel>Mô tả</FormLabel>
                      <FormControl>
                        <Input
                          required
                          {...field}
                          placeholder="Nhập mô tả"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isSubmitting}>
                  Thêm
                </Button>
              </form>
            </div>
          </Form>
        </div>
      </div>
    </main>
  );
}
