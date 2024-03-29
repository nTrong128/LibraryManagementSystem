import type {Metadata} from "next";
import {Inter} from "next/font/google";

import NavigationBar from "@/components/shared/navbar";
import {Toaster} from "@/components/ui/toaster";
import {SessionProvider} from "@/components/provider/next-auth-provider";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import {authOptions} from "@/auth";

const inter = Inter({subsets: ["latin"]});
export const metadata: Metadata = {
  title: "Library Management System",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    // return <div>YOU ARE NOT LOGIN</div>;
    redirect("/login");
  }
  return (
    <SessionProvider>
      <html lang="en">
        <body className={inter.className}>
          <NavigationBar />
          {children}
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
