import LenisProvider from "@/components/ui/LenisProvider";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-board max-w-152 mx-auto py-10 text-xs font-extralight ">
                <LenisProvider>{children}</LenisProvider>
            </body>
        </html>
    );
}
