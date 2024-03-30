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
import DatePicker from "react-date-picker";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {Calendar, Eraser} from "lucide-react";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

export function EditProfileForm(prop: {
  employee: Employee;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const session = useSession();
  type ValuePiece = Date | null;

  type Value = ValuePiece | [ValuePiece, ValuePiece];
  const [value, onChange] = useState<Value>(new Date(prop.employee.birthDate));

  const accessToken = session?.data?.user.accessToken;

  const form = useForm({
    defaultValues: {
      fullName: prop.employee.fullName,
      birthDate: prop.employee.birthDate,
      phoneNumber: prop.employee.phoneNumber,
      username: prop.employee.username,
    },
  });
  const {
    handleSubmit,
    control,
    formState: {isSubmitting},
  } = form;
  async function onSubmit(values: any) {
    values.username = prop.employee.username;
    try {
      console.log("values", values);
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/${prop.employee.id}`,
        values,
        {headers: {Authorization: `Bearer ${accessToken}`}}
      );
      if (response.data.flag) {
        action("list-employees");
        alert("Cập nhật thông tin người dùng thành công");
        prop.setOpen(false);
      }
      console.log(response);
    } catch (error) {
      console.log("Error editing profile", error);
    }
  }
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="fullName"
          render={({field}) => (
            <FormItem>
              <FormLabel>Tên người dùng</FormLabel>
              <FormControl>
                <Input
                  required
                  {...field}
                  placeholder="Nhập tên người dùng"
                  type="text"
                />
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
                  type="number"
                  {...field}
                  placeholder="Nhập số điện thoại người dùng"
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
