import { ProjectType } from "../types/project.type";

const Projects: ProjectType[] = [
    {
        name: "Winterfell",
        summary: "AI and Kubernetes orchestrated Solana Smart Contract generator, builder, tester, and deployer.",
        color: "#6c44fc",
        logo: "/projects/winterfell/logo2.png",
    },
    {
        name: "OrderBook",
        summary: "RustLang based extreme low latency orderbook, with O(1) next best price finder.",
        color: "#61784D",
        logo: "/projects/orderbook/logo2.png",
    },
    {
        name: "HighGarden",
        summary: "Prediction Marketplace based on Solana chain, with prefilled liquidity and market makers from Polymarket",
        color: "#ff4000",
        logo: "/projects/highgarden/logo2.png",
    },
];

export default Projects;