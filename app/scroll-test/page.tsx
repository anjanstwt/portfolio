import PixelDissolve from "./PixelDissolve";
import ScrollHUD from "./ScrollHUD";

export default function ScrollTestPage() {
    return (
        <div className="relative min-h-[1000vh] w-full bg-neutral-100">
            <PixelDissolve />
            <ScrollHUD />
        </div>
    );
}
