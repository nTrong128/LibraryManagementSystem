import {getServerSession} from "next-auth";
import {authOptions} from "@/auth";
import {DashboardContent} from "@/components/component/dashboard";
export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  let books,
    authors,
    publishers,
    categories,
    readers,
    checkouts: any[] = [];

  try {
    const urls = [
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/books/totals`,
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/authors/totals`,
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/publishers/totals`,
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/totals`,
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/readers/totals`,
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/checkouts/totals`,
    ];

    const requests = urls.map(async (url) => {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        method: "GET",
        cache: "no-cache",
      });
      const data = await response.json();
      return data.data;
    });

    [books, authors, publishers, categories, readers, checkouts] =
      await Promise.all(requests);
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>SOMETHING WENT WRONG</div>;
  }
  return (
    <div className=" m-10">
      <span className="font-bold text-3xl text-center">
        Chào mừng {user?.name}
      </span>

      <DashboardContent
        books={books}
        authors={authors}
        publishers={publishers}
        categories={categories}
        readers={readers}
        checkouts={checkouts}
        employees={undefined}
      />
    </div>
  );
}
