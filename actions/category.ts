export async function getCategories() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`);
  return data.json();
}
