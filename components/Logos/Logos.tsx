import { Figma } from "../SVGs/Figma";
import { Ganache } from "../SVGs/Ganache";
import { Hardhat } from "../SVGs/Hardhat";
import { Tailwind } from "../SVGs/Tailwind";
import { Truffle } from "../SVGs/Truffle";
import { Turborepo } from "../SVGs/Turborepo";
import { Websocket } from "../SVGs/Websocket";

export interface LogoItem {
    name: string,
    url: string | React.ReactNode
}

export const Logos: LogoItem[] = [
    { name: "typescript", url: "https://img.icons8.com/?size=100&id=nCj4PvnCO0tZ&format=png&color=FFFFFF" },
    { name: "javascript", url: "https://img.icons8.com/?size=100&id=RwtOBojoLS2N&format=png&color=FFFFFF" },
    { name: "java", url: "https://img.icons8.com/?size=100&id=FBycNmdwUQz1&format=png&color=FFFFFF" },
    { name: "c", url: "https://img.icons8.com/?size=100&id=mfkStOwP4EC0&format=png&color=FFFFFF" },
    { name: "solidity", url: "https://img.icons8.com/?size=100&id=at2DODSyQznb&format=png&color=FFFFFF" },
    { name: "rust", url: "https://img.icons8.com/?size=100&id=haeAxVQEIg0F&format=png&color=FFFFFF" },
    { name: "figma", url: <Figma className="size-full " /> },
    { name: "node.js", url: "https://img.icons8.com/?size=100&id=54087&format=png&color=FFFFFF" },
    { name: "express.js", url: "https://img.icons8.com/?size=100&id=SDVmtZ6VBGXt&format=png&color=FFFFFF" },
    { name: "react.js", url: "https://img.icons8.com/?size=100&id=NfbyHexzVEDk&format=png&color=FFFFFF" },
    { name: "next.js", url: "https://img.icons8.com/?size=100&id=MWiBjkuHeMVq&format=png&color=FFFFFF" },
    { name: "tailwindCSS", url: <Tailwind className="size-full " /> },
    { name: "prisma", url: "https://img.icons8.com/?size=100&id=aqb9SdV9P8oC&format=png&color=FFFFFF" },
    { name: "websocket", url: <Websocket className="size-full " /> },
    { name: "turborepo", url: <Turborepo className="size-full " /> },
    { name: "mongoDB", url: "https://img.icons8.com/?size=100&id=bosfpvRzNOG8&format=png&color=FFFFFF" },
    { name: "postgresql", url: "https://img.icons8.com/?size=100&id=38561&format=png&color=FFFFFF" },
    { name: "docker", url: "https://img.icons8.com/?size=100&id=cdYUlRaag9G9&format=png&color=FFFFFF" },
    { name: "git", url: "https://img.icons8.com/?size=100&id=20906&format=png&color=FFFFFF" },
    { name: "github", url: "https://img.icons8.com/?size=100&id=62856&format=png&color=FFFFFF" },
    { name: "postman", url: "https://img.icons8.com/?size=100&id=EPbEfEa7o8CB&format=png&color=FFFFFF" },
    { name: "metamask", url: "https://img.icons8.com/?size=100&id=Oi106YG9IoLv&format=png&color=FFFFFF" },
    { name: "ganache", url: <Ganache className="size-full " /> },
    { name: "truffle", url: <Truffle className="size-full " /> },
    { name: "hardhat", url: <Hardhat className="size-full " /> },
    { name: "ethereum", url: "https://img.icons8.com/?size=100&id=hwDzHF1W8Qnw&format=png&color=FFFFFF" },
    { name: "solana", url: "https://img.icons8.com/?size=100&id=icTiMgoOHSVy&format=png&color=FFFFFF" },
    { name: "aws", url: "https://img.icons8.com/?size=100&id=33039&format=png&color=FFFFFF" },
    { name: "python", url: "https://img.icons8.com/?size=100&id=13441&format=png&color=FFFFFF" },
    { name: "kubernetes", url: "https://img.icons8.com/?size=100&id=cvzmaEA4kC0o&format=png&color=FFFFFF" },
    { name: "redis", url: "https://cdn.simpleicons.org/redis/white" },
    { name: "anchor", url: "https://cdn.simpleicons.org/anchor/white" },
    { name: "zustand", url: "https://cdn.simpleicons.org/zustand/white" },
    { name: "web3.js", url: "https://cdn.simpleicons.org/web3dotjs/white" },
    { name: "razorpay", url: "https://cdn.simpleicons.org/razorpay/white" }
];
