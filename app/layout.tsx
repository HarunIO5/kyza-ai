import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import AuthProvider from "@/components/providers";
import clsx from "clsx";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: {
		icon: "/favicon.ico",
	},
	twitter: {
		card: 'summary_large_image'
	}
};

export type vidType = {
	id: string,
	key: string,
	name: string,
	customId: any,
	status: string,
	url: string
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {

	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
					<div className="relative flex flex-col h-screen">
						<Navbar />
						
						<main className="w-full mx-auto pt-16">
							<AuthProvider>
								{children}
							</AuthProvider>
						</main>
						
						<SiteFooter/>
					</div>
				</Providers>
			</body>
		</html>
	);
}
