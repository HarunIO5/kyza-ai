
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import AuthProvider from "@/components/providers";
import clsx from "clsx";
import { SiteFooter } from "@/components/site-footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Suspense } from "react";
import { checkCreditLimit, getTotalCreditCount } from "@/lib/credit-check";

export type vidType = {
	id: string,
	key: string,
	name: string,
	customId: any,
	status: string,
	url: string
}

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {

	const session = await getServerSession(authOptions)

	// const user = await getUser(session?.user?.email!)

	let checkCredits
	let getCreditCount

	if (session) {
		checkCredits = await checkCreditLimit({email: session?.user?.email!})

    	getCreditCount = await getTotalCreditCount({email: session?.user?.email!})
	}

	return (
			<div className="flex flex-col h-screen">
				<Navbar session={session!} creditCount={getCreditCount!} checkCreditLimit={checkCredits!}/>
				<main className="w-full mx-auto flex-grow">
						{children}
				</main>
				<SiteFooter/>
			</div>
	);
}
