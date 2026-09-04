import Clock from "../../ui/icons/Clock";
import Logo from "../../ui/icons/Logo";


export default function Footer() {
    return (
        <footer className="min-h-screen flex flex-col justify-between px-10 py-12 text-primary-light">
            {/* the mark is the footer's centrepiece: top chamber empty, bottom full */}
            <div className="flex-1 flex flex-col justify-center items-center gap-14">
                <Logo variant="hourglass" size={260} className="max-w-[50vw]" />
                <div className="text-sm uppercase tracking-[0.35em] text-primary-light/60">
                    Anjan Suman
                </div>
            </div>

            {/* baseline: small mark, the clock, the sign-off */}
            <div className="grid grid-cols-3 items-end border-t border-grub pt-8">
                <div className="flex items-center gap-4">
                    <Logo variant="hourglass" size={22} />
                    <span className="text-xs uppercase tracking-[0.2em] text-primary-light/50">
                        Time never waits
                    </span>
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
