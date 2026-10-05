import { useEffect, useState } from "react";

export default function useClock() {
    const [now, setNow] = useState<Date | null>(null);

    useEffect(() => {
        setNow(new Date());
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    const day = now?.toLocaleDateString("en-US", { weekday: "short" });
    const month = now?.toLocaleDateString("en-US", { month: "long" });
    const time = now?.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", second: "numeric", hour12: true });

    return {
        now,
        day,
        month,
        time,
    };

}