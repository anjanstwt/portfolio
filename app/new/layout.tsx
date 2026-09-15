import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const FONT_STACK =
    'Inter, system-ui, -apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

export default function NewLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={inter.className} style={{ fontFamily: FONT_STACK }}>
            {children}
        </div>
    );
}
