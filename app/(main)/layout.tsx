import { Suspense } from "react";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession(authOptions)

  // const user = await getUser(session?.user?.email!)

  // let checkCredits
  // let getCreditCount

  // if (session) {
  // 	checkCredits = await checkCreditLimit({email: session?.user?.email!})

  // 	getCreditCount = await getTotalCreditCount({email: session?.user?.email!})
  // }

  return (
    <div className="flex flex-col h-screen">
      <Suspense>
        <Navbar />
      </Suspense>
      <main className="w-full mx-auto flex-grow">{children}</main>
    </div>
  );
}
