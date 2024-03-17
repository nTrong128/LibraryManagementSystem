import {Dialog} from "@/components/ui/dialog";
import {DialogContent} from "@radix-ui/react-dialog";
import {Form, useForm} from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {revalidateTag} from "next/cache";

interface IProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (v: boolean) => void;
}

const CreateBook = (props: IProps) => {
  const {isCreateModalOpen, setIsCreateModalOpen} = props;
  const form = useForm();
  const handleCloseCreateModal = () => {
    form.reset();
    setIsCreateModalOpen(false);
  };

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    const res = await handleCreateBookAction(values);
    if (res?.id) {
      handleCloseCreateModal();
      // message.success("Create succeed!");
    }
  };

  return (
    <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
      <DialogContent>
        <Form>
          <FormField
            control={form.control}
            name="..."
            render={() => (
              <FormItem>
                <FormLabel />
                <FormControl>{/* Your form field */}</FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBook;

const handleCreateBookAction = async (data: any) => {
  "use server";
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/books`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  revalidateTag("list-users");
  return await res.json();
};
