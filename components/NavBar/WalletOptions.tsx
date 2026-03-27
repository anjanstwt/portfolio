"use client"

import { Connector, CreateConnectorFn, useConnect } from "wagmi";
import { Providers } from "./Providers";
import { useProvider } from "@/zustand/zustand";

export const WalletOptions = () => {

    const { connectors, connectAsync } = useConnect();
    const { provider, setProvider } = useProvider();

    const connection = async (connector: Connector<CreateConnectorFn>) => {
        try {
            setProvider(connector.name);
            await connectAsync({ connector });
        } catch (error) {
            console.log("Connection failed!");
        }
    }

    return connectors.map((connector) => (
        <button
            key={connector.uid}
            onClick={() => connection(connector)}
            className={`w-full text-left py-2 px-3 rounded hover:bg-[#1c1c1c] transition duration-200 ease-in-out cursor-pointer flex justify-start items-center gap-x-2 ${(connector.name === provider) ? "bg-[#2c2c2c] " : ""} `}
        >
            {
                Providers.find(wallet => wallet.name === connector.name)?.img
            }
            {connector.name}
        </button>
    ))
}