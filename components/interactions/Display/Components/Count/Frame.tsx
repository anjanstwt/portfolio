'use client'

import { cn } from "@/lib/utils";
import { one, three, two } from "./Values";
import { useState } from "react";

const outerRoundedClasses = {
    tl: "rounded-tl-xl",
    tr: "rounded-tr-xl",
    bl: "rounded-bl-xl",
    br: "rounded-br-xl",
};

const innerRoundedClasses = {
    tl: "rounded-tl-3xl",
    tr: "rounded-tr-3xl",
    bl: "rounded-bl-3xl",
    br: "rounded-br-3xl",
};

type Curve = keyof typeof outerRoundedClasses;

const SIZE = 12;

export default function Frame() {
    // const grid = Array.from({ length: SIZE }, () =>
    //     Array.from({ length: SIZE }, () => (Math.random() < 0.3 ? 1 : 0))
    // );

    const [grid, setGrid] = useState<number[][]>(one);

    // const grid = three;

    const innerCurves: Curve[][][] = Array.from({ length: SIZE }, () =>
        Array.from({ length: SIZE }, () => [])
    );
    const outerCurves: Curve[][][] = Array.from({ length: SIZE }, () =>
        Array.from({ length: SIZE }, () => [])
    );

    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            const top = i > 0 && !!grid[i - 1][j];
            const right = j < SIZE - 1 && !!grid[i][j + 1];
            const bottom = i < SIZE - 1 && !!grid[i + 1][j];
            const left = j > 0 && !!grid[i][j - 1];

            if (!grid[i][j]) {
                if (bottom && right) innerCurves[i][j].push("br");
                if (bottom && left) innerCurves[i][j].push("bl");
                if (top && right) innerCurves[i][j].push("tr");
                if (top && left) innerCurves[i][j].push("tl");
            } else {
                const topLeft = i > 0 && j > 0 && !!grid[i - 1][j - 1];
                const topRight = i > 0 && j < SIZE - 1 && !!grid[i - 1][j + 1];
                const bottomLeft = i < SIZE - 1 && j > 0 && !!grid[i + 1][j - 1];
                const bottomRight = i < SIZE - 1 && j < SIZE - 1 && !!grid[i + 1][j + 1];

                if (!bottom && !right && !bottomRight) outerCurves[i][j].push("br");
                if (!bottom && !left && !bottomLeft) outerCurves[i][j].push("bl");
                if (!top && !right && !topRight) outerCurves[i][j].push("tr");
                if (!top && !left && !topLeft) outerCurves[i][j].push("tl");
            }
        }
    }

    return (
        <div className="inline-block bg-white divide-y divide-ink">
            {grid.map((row, i) => (
                <div key={i} className="flex divide-x divide-ink">
                    {row.map((cell, j) => (
                        <Cell
                            key={`${i}-${j}`}
                            value={!!cell}
                            innerCurves={innerCurves[i][j]}
                            outerCurves={outerCurves[i][j]}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

function Cell({
    value,
    innerCurves,
    outerCurves,
}: {
    value: boolean;
    innerCurves: Curve[];
    outerCurves: Curve[];
}) {
    const curves = value ? outerCurves : innerCurves;
    const roundedClasses = value ? outerRoundedClasses : innerRoundedClasses;

    return (
        <div className={cn("relative h-10 w-10", value ? "bg-white" : "bg-red-400")}>
            <div
                className={cn(
                    "absolute inset-0",
                    value ? "bg-red-400" : "bg-white",
                    curves.map((curve) => roundedClasses[curve])
                )}
            />
        </div>
    );
}