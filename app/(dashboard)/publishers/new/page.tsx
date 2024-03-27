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

export default function NewPublisherPage() {
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/publishers`,
        values,
        {headers: {Authorization: `Bearer ${accessToken}`}}
      );
      if (response.status === 201) {
        action("list-publihsers");
        alert("Thêm nhà xuất bản thành công");
        router.back();
      }
    } catch (error) {
      console.log("Error creating product", error);
    }
  }
  return (
    <main className="m-auto my-10 max-w-3xl space-y-10">
      <div>
        <h1 className="text-3xl font-semibold text-center">
          Thêm nhà xuất bản
        </h1>
        <p className="mt-2 text-sm text-gray-500 text-center">
          Thêm nhà xuất bản mới vào hệ thống.
        </p>
      </div>
      <div className="rounded-lg border p-4">
        <Form {...form}>
          <div className="">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <FormField
                control={control}
                name="publisherName"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Tên nhà xuất bản</FormLabel>
                    <FormControl>
                      <Input
                        required
                        {...field}
                        placeholder="Nhập tên nhà xuất bản"
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
                    <FormLabel>Địa chỉ</FormLabel>
                    <FormControl>
                      <Input
                        required
                        {...field}
                        placeholder="Nhập địa chỉ nhà xuất bản"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="email"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        required
                        {...field}
                        placeholder="Nhập địa chỉ email nhà xuất bản"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="representativeInfo"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Thông tin đại diện</FormLabel>
                    <FormControl>
                      <Input
                        required
                        {...field}
                        placeholder="Nhập thông tin đại diện nhà xuất bản"
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
    </main>
  );
}
