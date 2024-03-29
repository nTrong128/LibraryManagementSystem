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
import DatePicker from "react-date-picker";
import {useState} from "react";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import {Calendar, Eraser} from "lucide-react";
import {formatDate} from "@/lib/tools";
import {useSession} from "next-auth/react";
import action from "@/actions/action";

export default function NewPublisherPage() {
  const session = useSession();
  const accessToken = session?.data?.user.accessToken;

  type ValuePiece = Date | null;

  type Value = ValuePiece | [ValuePiece, ValuePiece];
  const [value, onChange] = useState<Value>(new Date());
  const router = useRouter();

  const form = useForm();
  const {
    handleSubmit,
    control,
    formState: {isSubmitting},
  } = form;
  async function onSubmit(values: any) {
    if (value) {
      values.birthDate = formatDate(value.toLocaleString("vi-VN"));
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/employees`,
        values,
        {headers: {Authorization: `Bearer ${accessToken}`}}
      );
      if (response.status === 201) {
        alert("Thêm nhân viên thành công");
        action("list-employees");
        router.back();
      }
    } catch (error) {
      console.log("Error creating employee", error);
    }
  }
  return (
    <main className="m-4">
      <Button className="w-1/6" onClick={() => router.back()}>
        Quay lại
      </Button>
      <div className="m-auto my-10 max-w-3xl space-y-10">
        <div>
          <h1 className="text-3xl font-semibold text-center">Thêm nhân viên</h1>
          <p className="mt-2 text-sm text-gray-500 text-center">
            Thêm nhân viên mới vào hệ thống.
          </p>
        </div>
        <div className="rounded-lg border p-4">
          <Form {...form}>
            <div className="">
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <FormField
                  control={control}
                  name="fullName"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Tên nhân viên</FormLabel>
                      <FormControl>
                        <Input
                          required
                          {...field}
                          placeholder="Nhập tên nhân viên"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="birthDate"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Ngày sinh</FormLabel>
                      <FormControl>
                        <div>
                          <DatePicker
                            className=" border border-gray-300 rounded-md"
                            onChange={onChange}
                            value={value}
                            locale="vi-VN"
                            clearIcon={<Eraser className="scale-75" />}
                            calendarIcon={<Calendar className="scale-75" />}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="phoneNumber"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Số điện thoại</FormLabel>
                      <FormControl>
                        <Input
                          required
                          {...field}
                          placeholder="Nhập số điện thoại nhân viên"
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
