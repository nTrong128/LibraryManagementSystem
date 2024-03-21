import action from "@/actions/action";

export async function deleteReader(id: number) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/readers/${id}`,
    {
      method: "DELETE",
    }
  );
  action("list-readers");
  return data.json();
}
