import Footer from "./components/Footer";

export default function TestPage() {
    return (
        <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-between gap-10 px-6 py-16">
            <div>
                <h1 className="text-2xl font-semibold text-neutral-200">Test</h1>
                <p className="mt-2 text-sm text-neutral-500">
                    Sandbox page for trying out new components.
                </p>
            </div>

            <Footer />
        </div>
    );
}
