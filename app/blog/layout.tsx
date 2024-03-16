export default function BlogLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="min-h-screen">
			<div className="container mx-auto p-4">
				{children}
			</div>
		</section>
	);
}
