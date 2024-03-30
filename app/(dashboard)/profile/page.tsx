import {getServerSession} from "next-auth";
import {authOptions} from "@/auth";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {ProfileContent} from "@/components/component/profile";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  console.log(user);

  return (
    <main>
      <Card className="flex-1">
        <CardHeader className="md:gap-4 bg-gray-200 rounded-t-lg">
          <div className="flex justify-between items-center">
            <CardTitle>Thông tin tài khoản</CardTitle>
          </div>
        </CardHeader>
      </Card>
      <p>{JSON.stringify(user)}</p>
      <p>{new Date().getTime()}</p>
      <ProfileContent user={user} />
    </main>
  );
}
