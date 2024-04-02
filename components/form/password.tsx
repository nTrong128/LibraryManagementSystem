"use client";
import {Employee} from "@/types";
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
import {useState} from "react";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {changePasswordSchema} from "@/schema/schema";

export function ChangePasswordForm(prop: {
  employee: Employee;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const session = useSession();
  const accessToken = session?.data?.user.accessToken;
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
  });
  const {
    handleSubmit,
    control,
    formState: {isSubmitting},
  } = form;
  async function onSubmit(values: any) {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/${prop.employee.id}/accounts/password-change`,
        values,
        {headers: {Authorization: `Bearer ${accessToken}`}}
      );
      if (response.data.flag) {
        alert("Cập nhật mật khẩu tài khoản thành công");
        prop.setOpen(false);
      }
    } catch (error) {
      const responseError = error as {response: {data: {message: string}}};
      setError(responseError.response.data.message);
    }
  }
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="oldPassword"
          render={({field}) => (
            <FormItem>
              <FormLabel>Mật khẩu cũ</FormLabel>
              <FormControl>
                <Input
                  required
                  {...field}
                  placeholder="Nhập mật kha cũ"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="newPassword"
          render={({field}) => (
            <FormItem>
              <FormLabel>Mật khẩu mới</FormLabel>
              <FormControl>
                <Input
                  required
                  {...field}
                  placeholder="Nhập mật khẩu mới"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="retypePassword"
          render={({field}) => (
            <FormItem>
              <FormLabel>Nhập lại mật khẩu mới</FormLabel>
              <FormControl>
                <Input
                  required
                  {...field}
                  placeholder="Nhập lại mật khẩu mới"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && (
          <div className="bg-red-100 text-red-500 text-center rounded-sm p-2">
            {error}
          </div>
        )}
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
