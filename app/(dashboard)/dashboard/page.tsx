import {getServerSession} from "next-auth";
import {authOptions} from "@/auth";
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  return (
    <div className="font-bold text-5xl text-center m-10">
      XIN CHÀO {user?.name}!
    </div>
  );
}
