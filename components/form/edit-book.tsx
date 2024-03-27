import {Book, Author, Category, Publisher} from "@/types";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {getAuthors} from "@/actions/author";
import {getCategories} from "@/actions/category";
import {getPublishers} from "@/actions/publisher";
import {useForm} from "react-hook-form";
import axios from "axios";
import action from "@/actions/action";
import {Input} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Button} from "@/components/ui/button";

export function FormEditBook(prop: {
  book: Book;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const session = useSession();
  const accessToken = session?.data?.user.accessToken;

  const [author, setAuthor] = useState<Author[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [publisher, setPublisher] = useState<Publisher[]>([]);
  const getData = async () => {
    try {
      const res_author = await getAuthors();
      const res_category = await getCategories();
      const res_publisher = await getPublishers();
      setAuthor(res_author.data);
      setCategory(res_category.data);
      setPublisher(res_publisher.data);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  useEffect(() => {
    getData();
  });

  const form = useForm({
    defaultValues: {
      name: prop.book.bookName,
      publicationYear: prop.book.publicationYear.toString(),
      categoryId: prop.book.category.id.toString(),
      authorId: prop.book.author.id.toString(),
      publisherId: prop.book.publisher.id.toString(),
    },
  });
  const {
    handleSubmit,
    control,
    formState: {isSubmitting},
  } = form;
  async function onSubmit(values: any) {
    values.authorId = Number(values.authorId);
    values.categoryId = Number(values.categoryId);
    values.publisherId = Number(values.publisherId);
    values.publicationYear = Number(values.publicationYear);
    try {
      console.log("values", values);
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/books/${prop.book.id}`,
        values,
        {headers: {Authorization: `Bearer ${accessToken}`}}
      );
      if (response.data.flag) {
        action("list-books");
        alert("Cập nhật sản phẩm thành công");
        prop.setOpen(false);
      }
      console.log(response);
    } catch (error) {
      console.log("Error editing product", error);
    }
  }
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="name"
          render={({field}) => (
            <FormItem>
              <FormLabel>Tên sách</FormLabel>
              <FormControl>
                <Input
                  required
                  {...field}
                  placeholder="Nhập tên sách"
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="publicationYear"
          render={({field}) => (
            <FormItem>
              <FormLabel>Năm xuất bản</FormLabel>
              <FormControl>
                <Input
                  required
                  {...field}
                  placeholder="Nhập năm xuất bản"
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="categoryId"
          render={({field}) => (
            <FormItem>
              <FormLabel>Thể loại</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger {...field}>
                    <SelectValue placeholder="Chọn thể loại" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {category.map((category: Category) => (
                    <SelectItem key={category.id} value={String(category.id)}>
                      {category.categoryName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="authorId"
          render={({field}) => (
            <FormItem>
              <FormLabel>Tác giả</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger {...field}>
                    <SelectValue placeholder="Chọn tác giả" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {author.map((author: Author) => (
                    <SelectItem key={author.id} value={String(author.id)}>
                      {author.authorName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="publisherId"
          render={({field}) => (
            <FormItem>
              <FormLabel>Tên nhà xuất bản</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger {...field}>
                    <SelectValue placeholder="Chọn  nhà xuất bản" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {publisher.map((publisher: Publisher) => (
                    <SelectItem key={publisher.id} value={String(publisher.id)}>
                      {publisher.publisherName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
          "
          type="submit"
          disabled={isSubmitting}>
          Cập nhật
        </Button>
      </form>
    </Form>
  );
}
