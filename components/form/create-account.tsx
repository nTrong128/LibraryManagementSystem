"use client";
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
import {Employee} from "@/types";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {accountSchema} from "@/schema/schema";
import {useState} from "react";

export function CreateAccountForm(prop: {
  employee: Employee;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [error, setError] = useState("");
  const session = useSession();
  const accessToken = session?.data?.user.accessToken;

  const form = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
  });
  const {
    handleSubmit,
    control,
    formState: {isSubmitting},
  } = form;
  async function onSubmit(values: any) {
    values.enabled = true;
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/${prop.employee.id}/accounts`,
        values,
        {headers: {Authorization: `Bearer ${accessToken}`}}
      );
      if (response.data.flag) {
        action("list-employees");
        alert("Tạo tài khoản thành công");
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
          name="username"
          render={({field}) => (
            <FormItem>
              <FormLabel>Tên tài khoản</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Nhập tên tài khoản" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({field}) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input type="password" {...field} placeholder="Nhập mật khẩu" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="retype_password"
          render={({field}) => (
            <FormItem>
              <FormLabel>Nhập lại mật khẩu</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  placeholder="Nhập lại mật khẩu"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="role"
          render={({field}) => (
            <FormItem>
              <FormLabel>Tác giả</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                required>
                <FormControl>
                  <SelectTrigger {...field}>
                    <SelectValue placeholder="Chọn loại tài khoản" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={String("user")}>USER</SelectItem>
                  <SelectItem value={String("admin")}>ADMIN</SelectItem>
                </SelectContent>
              </Select>
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
          Tạo tài khoản
        </Button>
      </form>
    </Form>
  );
}
