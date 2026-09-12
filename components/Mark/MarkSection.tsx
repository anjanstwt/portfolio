import PlayMark from "../ui/icons/PlayMark";

// Sits right after the footer: the play mark, centred, nothing else.
export default function MarkSection() {
    return (
        <section className="flex min-h-[70vh] w-full items-center justify-center px-6 py-24 text-primary-light">
            <PlayMark size={300} className="max-w-[60vw]" />
        </section>
    );
}
