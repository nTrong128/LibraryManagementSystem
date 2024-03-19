"use client";
import {getAuthors} from "@/actions/author";
import {getCategories} from "@/actions/category";
import {getPublishers} from "@/actions/publisher";
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
import {Author, Category, Publisher} from "@/type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import axios from "axios";

export default function NewProductPage() {
  const [author, setAuthor] = useState<Author[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [publisher, setPublisher] = useState<Publisher[]>([]);
  const router = useRouter();
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
  }, []);

  const form = useForm();
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
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/books`,
        values
      );
      console.log(response);
      if (response.status === 201) {
        alert("Thêm sản phẩm thành công");
        router.push("/product");
      }
    } catch (error) {
      console.log("Error creating product", error);
    }
  }
  return (
    <main className="m-auto my-10 max-w-3xl space-y-10">
      <div>
        <h1 className="text-3xl font-semibold text-center">Add New Product</h1>
        <p className="mt-2 text-sm text-gray-500 text-center">
          Add a new product to your store.
        </p>
      </div>
      <div className="rounded-lg border p-4">
        <Form {...form}>
          <div className="">
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger {...field}>
                          <SelectValue placeholder="Chọn thể loại" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {category.map((category: Category) => (
                          <SelectItem
                            key={category.id}
                            value={String(category.id)}>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
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
                    <FormLabel>Tên loại</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger {...field}>
                          <SelectValue placeholder="Chọn  nhà xuất bản" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {publisher.map((publisher: Publisher) => (
                          <SelectItem
                            key={publisher.id}
                            value={String(publisher.id)}>
                            {publisher.publisherName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
