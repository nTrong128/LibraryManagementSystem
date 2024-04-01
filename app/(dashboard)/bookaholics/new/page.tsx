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
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {readerSchema} from "@/schema/schema";

export default function NewReaderPage() {
  const session = useSession();
  const accessToken = session?.data?.user?.accessToken;
  const router = useRouter();

  const form = useForm<z.infer<typeof readerSchema>>({
    resolver: zodResolver(readerSchema),
  });
  const {
    handleSubmit,
    control,
    formState: {isSubmitting},
  } = form;
  async function onSubmit(values: any) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/readers`,
        values,
        {headers: {Authorization: `Bearer ${accessToken}`}}
      );
      if (response.status === 201) {
        action("list-readers");
        alert("Thêm đọc giả thành công");
        router.back();
      }
    } catch (error) {
      console.log("Error creating reader", error);
      return <div>Failed to load</div>;
    }
  }
  return (
    <main className="m-4">
      <Button className="w-1/6" onClick={() => router.back()}>
        Quay lại
      </Button>
      <div className="m-auto my-10 max-w-3xl space-y-10">
        <div>
          <h1 className="text-3xl font-semibold text-center">Thêm đọc giả</h1>
          <p className="mt-2 text-sm text-gray-500 text-center">
            Thêm đọc giả mới vào hệ thống.
          </p>
        </div>
        <div className="rounded-lg border p-4">
          <Form {...form}>
            <div className="">
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <FormField
                  control={control}
                  name="readerName"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Tên đọc giả</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Nhập tên đọc giả"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="address"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Địa chỉ đọc giả</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Nhập địa chỉ đọc giả"
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
      </div>
    </main>
  );
}
