import Clock from "../ui/icons/Clock";
import Logo from "../ui/icons/Logo";


export default function Footer() {
    return (
        <footer className="min-h-screen flex flex-col justify-between px-10 py-12 text-primary-light">
            {/* the mark: "~" is home */}
            <div className="flex-1 flex flex-col justify-center items-center gap-12">
                <Logo variant="tilde" size={360} className="max-w-[60vw]" />
                <div className="text-sm uppercase tracking-[0.35em] text-primary-light/60">
                    Anjan Suman
                </div>
            </div>

            {/* baseline: ~/anjan, the clock, the sign-off */}
            <div className="grid grid-cols-3 items-end border-t border-grub pt-8">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary-light/50">
                    <Logo variant="tilde" size={26} />
                    <span>/anjan</span>
                </div>
                <div className="flex justify-center">
                    <Clock size={70} />
                </div>
                <div className="text-right text-xs uppercase tracking-[0.2em] text-primary-light/50">
                    &copy; {new Date().getFullYear()} Anjan Suman
                </div>
            </div>
        </footer>
    );
}
