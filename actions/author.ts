export async function getAuthors() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/authors`);
  return data.json();
}
