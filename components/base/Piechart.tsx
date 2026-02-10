"use client";
import { PieChart, Pie, Cell } from "recharts";

export default function Piechart() {
  const data = [
    { title: "dev", value: 30, color: "#000000" },
    { title: "meet", value: 20, color: "#4a4a4a" },
    { title: "grouping", value: 10, color: "#2a2a2a" },
  ];

  return (
    <div className="flex items-center justify-center">
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="title"
          startAngle={-90}
          endAngle={270}
          innerRadius={25}
          outerRadius={70}
          paddingAngle={8}
          cornerRadius={8}
          stroke="#737373"
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}

