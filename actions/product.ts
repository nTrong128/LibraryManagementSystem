import action from "@/actions/action";

export async function deleteProduct(id: number) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/books/${id}`,
    {
      method: "DELETE",
    }
  );
  action("list-books");
  return data.json();
}
