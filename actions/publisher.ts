export async function getPublishers() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/publishers`);
  return data.json();
}
