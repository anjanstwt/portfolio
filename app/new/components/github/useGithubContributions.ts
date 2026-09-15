"use client";

import { useEffect, useState } from "react";

export interface ContributionDay {
    date: string;
    count: number;
}

// Same public API react-github-calendar itself calls under the hood
// (see node_modules/react-github-calendar/build/index.js) — reused here
// directly since we want the raw daily counts, not the heatmap grid.
const API = "https://github-contributions-api.jogruber.de/v4/";

export function useGithubContributions(username: string, year: number | "last" = "last") {
    const [data, setData] = useState<ContributionDay[] | null>(null);

    useEffect(() => {
        let cancelled = false;

        fetch(`${API}${username}?y=${year}`)
            .then((res) => res.json())
            .then((json) => {
                if (!cancelled) setData(json.contributions ?? []);
            })
            .catch(() => {
                if (!cancelled) setData([]);
            });

        return () => {
            cancelled = true;
        };
    }, [username, year]);

    return data;
}
