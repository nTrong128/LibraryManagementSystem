import {getServerSession} from "next-auth";
import {authOptions} from "@/auth";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {ProfileContent} from "@/components/component/profile";
import {Account, Employee} from "@/types";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  let user: Employee;
  const id = session?.user.id;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/${id}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        method: "GET",
        next: {tags: ["list-employees"]},
        cache: "no-cache",
      }
    );
    const data = await res.json();
    user = data.data;
    if (!user) return <div>Loading...</div>;
  } catch (error) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <Card className="flex-1">
        <CardHeader className="md:gap-4 bg-gray-200 rounded-t-lg">
          <div className="flex justify-between items-center">
            <CardTitle>Thông tin tài khoản</CardTitle>
          </div>
        </CardHeader>
      </Card>
      <ProfileContent user={user} />
    </main>
  );
}
