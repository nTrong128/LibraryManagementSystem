"use server";
import action from "@/actions/action";
export async function getAuthors() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/authors`);
  return data.json();
}

export async function deleteAuthor(id: number) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/authors/${id}`,
    {
      method: "DELETE",
    }
  );
  action("list-authors");
  return data.json();
}
