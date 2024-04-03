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
import {Publisher} from "@/types";
import {Input} from "@/components/ui/input";

import {Button} from "@/components/ui/button";

export function FormEditPublisher(prop: {
  publisher: Publisher;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const session = useSession();
  const accessToken = session?.data?.user.accessToken;

  const form = useForm({
    defaultValues: {
      publisherName: prop.publisher.publisherName,
      address: prop.publisher.address,
      email: prop.publisher.email,
      representativeInfo: prop.publisher.representativeInfo,
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/publishers/${prop.publisher.id}`,
        values,
        {headers: {Authorization: `Bearer ${accessToken}`}}
      );
      if (response.data.flag) {
        action("list-authors");
        alert("Cập nhật nhà xuất bản thành công");
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
                  placeholder="Nhập địa chỉ NXB"
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
              <FormLabel>Email nhà xuất bản</FormLabel>
              <FormControl>
                <Input
                  required
                  {...field}
                  placeholder="Nhập địa chỉ email NXB"
                  type="email"
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
                  placeholder="Nhập thông tin đại diện NXB"
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
