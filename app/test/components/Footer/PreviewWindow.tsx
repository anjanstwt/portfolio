import { cn } from "@/lib/utils";
import Block from "../../ui/Block";
import Safari from "../../ui/Safari";
import type FooterType from "../../types/footer.type";

interface PreviewWindowProps {
    preview: FooterType["preview"];
    className?: string;
}

export default function PreviewWindow({ preview, className }: PreviewWindowProps) {
    return (
        <Block className={cn("p-2 rounded-2xl ", className)}>
            <Safari
                src={preview.src}
                alt={preview.alt}
                url={preview.url}
                size={"340"}
            />
        </Block>
    );
}
