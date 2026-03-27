"use client"

import { useAccount, useBalance, useDisconnect, useEnsAvatar, useEnsName, useWalletClient } from 'wagmi';
import { Providers } from './Providers';
import { Chain, formatUnits, parseEther } from 'viem';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { GetEnsAvatarReturnType, GetEnsNameReturnType } from 'wagmi/actions';
import { useProvider } from '@/zustand/zustand';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from "gsap";

export function Account() {

    const { address, connector, chain } = useAccount();
    const { data: walletClient } = useWalletClient();
    const { data: balance } = useBalance({ address });
    const { disconnect } = useDisconnect();
    const { data: ensName } = useEnsName({ address });
    const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

    const { provider } = useProvider();

    const ContainerRef = useRef<HTMLDivElement>(null);
    const TransitionWrapperRef = useRef<HTMLDivElement>(null);
    const AccountInfoRef = useRef<HTMLDivElement>(null);
    const ConnectingRef = useRef<HTMLDivElement>(null);

    const [showAccountInfo, setShowAccountInfo] = useState<boolean>(false);
    const [prevShowAccountInfo, setPrevShowAccountInfo] = useState<boolean>(false);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);


    useLayoutEffect(() => {
        const container = ContainerRef.current;
        const wrapper = TransitionWrapperRef.current;

        if (!container || !wrapper) return;

        // Only animate if there's a state change
        if (showAccountInfo === prevShowAccountInfo) return;

        const ctx = gsap.context(() => {
            if (showAccountInfo) {
                // Transitioning from Connecting to AccountInfo
                setIsAnimating(true);

                // Wait for AccountInfo to render and get its height
                requestAnimationFrame(() => {
                    const accountInfo = AccountInfoRef.current;
                    if (!accountInfo) return;

                    const currentHeight = container.offsetHeight;
                    const targetHeight = accountInfo.scrollHeight + 40; // Add padding

                    const tl = gsap.timeline({
                        onComplete: () => {
                            gsap.set(container, { height: "auto" });
                            setIsAnimating(false);
                        }
                    });

                    // Set initial state for AccountInfo (hidden)
                    gsap.set(accountInfo, { opacity: 0, y: 20 });
                    gsap.set(container, { height: container.offsetHeight });

                    tl.to(container, {
                        height: targetHeight,
                        duration: 0.4, // SMOOTH transition
                        ease: "power2.out"
                    });

                    // Appear slightly after height grows starts
                    tl.to(accountInfo, {
                        opacity: 1,
                        y: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    }, "-=0.2"); // start this 0.2s before height animation ends

                });

            } else {
                // Transitioning from AccountInfo to Connecting
                setIsAnimating(true);

                // Wait for Connecting to render and get its height
                requestAnimationFrame(() => {
                    const connecting = ConnectingRef.current;
                    if (!connecting) return;

                    const currentHeight = container.offsetHeight;
                    const targetHeight = connecting.scrollHeight + 40; // Add padding

                    const tl = gsap.timeline({
                        onComplete: () => {
                            gsap.set(container, { height: "auto" });
                            setIsAnimating(false);
                        }
                    });

                    // Set initial state for Connecting (hidden)
                    gsap.set(connecting, { opacity: 0, scale: 0.8 });

                    // Animate container height
                    tl.fromTo(
                        container,
                        { height: currentHeight },
                        {
                            height: targetHeight,
                            duration: 0.4,
                            ease: "power2.out"
                        }
                    );

                    // Fade in Connecting
                    tl.to(connecting, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.3,
                        ease: "back.out(1.7)"
                    }, "-=0.2");
                });
            }
        }, ContainerRef);

        return () => ctx.revert();
    }, [showAccountInfo, prevShowAccountInfo]);

    useEffect(() => {
        const newShowAccountInfo = !!(address && connector && chain && balance);
        setPrevShowAccountInfo(showAccountInfo);
        setShowAccountInfo(newShowAccountInfo);
    }, [address, connector, chain, balance, showAccountInfo]);

    const buyCoffee = async () => {
        const myAddress = "0xA3Dc964f25A61891ECA62a5e778B65dAECdCcb79";

        if (!walletClient) {
            toast.error("Wallet not connected!");
            return;
        }

        try {

            const { data } = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");

            const ethPrice = data?.ethereum?.usd;

            if (!ethPrice) {
                toast.error("Failed to fetch ETH price");
                return;
            }

            // converting $5 to ETH
            const ethAmount = (5 / ethPrice).toFixed(18);
            const value = parseEther(ethAmount);

            const hash = async () => {
                await walletClient.sendTransaction({
                    to: myAddress,
                    value: value
                });
            }

            toast.promise(
                hash,
                {
                    loading: 'Requesting...',
                    success: 'Transaction successfull',
                    error: 'Transaction failed'
                }
            )

        } catch (error) {
            toast.error("Error!");
            return;
        }
    }

    return (
        <div className="h-full flex flex-col items-center justify-center gap-y-2">
            <Toaster />
            <div className="w-full flex flex-col justify-center items-center">
                <div>
                    {
                        Providers.find((wallet) => wallet.name === provider)?.img2
                    }
                </div>
                <div className="text-sm tracking-wider">
                    {provider}
                </div>
            </div>

            <div
                ref={ContainerRef}
                className="w-full rounded bg-[#1c1c1c] border border-[#3d3932] overflow-hidden"
            >
                <div
                    ref={TransitionWrapperRef}
                    className="p-5 flex justify-center items-center relative"
                >
                    {showAccountInfo ? (
                        <AccountInfo
                            onClick={buyCoffee}
                            ref={AccountInfoRef}
                            address={address!}
                            chain={chain!}
                            ensAvatar={ensAvatar}
                            ensName={ensName}
                            balance={balance!}
                            disconnect={disconnect}
                        />
                    ) : (
                        <Connecting ref={ConnectingRef} />
                    )}
                </div>
            </div>
        </div>
    )
}

interface AccountInfoProps {
    onClick: () => void,
    ref?: React.Ref<HTMLDivElement>,
    address: string,
    chain: Chain,
    ensAvatar: GetEnsAvatarReturnType | undefined,
    ensName: GetEnsNameReturnType | undefined,
    balance: {
        decimals: number,
        formatted: string,
        symbol: string,
        value: bigint,
    },
    disconnect: () => void
}

const AccountInfo = ({ onClick, ref, address, chain, ensAvatar, ensName, balance, disconnect }: AccountInfoProps) => {

    return <div
        className="w-full flex flex-col justify-center items-center gap-y-3"
        ref={ref}
    >

        {/* account image and address */}
        <div className='flex justify-center items-center gap-x-3'>
            <div className="w-10 h-10 rounded overflow-hidden border border-[#3d3932]">
                {ensAvatar ? (
                    <img src={ensAvatar} alt="ENS Avatar" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#2c2c2c] text-sm text-[#D8CFBC]">
                        {ensName ? ensName[0].toUpperCase() : address.slice(2, 4).toUpperCase()}
                    </div>
                )}
            </div>
            {address && (
                <div
                    className="max-w-xs px-3 py-1 rounded bg-[#2c2c2c] border border-[#3d3932] text-[#D8CFBC] text-sm font-mono truncate"
                    title={ensName ? `${ensName} (${address})` : address}
                >
                    {ensName ? `${ensName} (${address})` : address}
                </div>
            )}
        </div>

        {/* chain name */}
        <div className="w-full flex justify-start items-center gap-x-3">
            <div className="flex items-center justify-center px-3 py-1 rounded bg-[#2c2c2c] border border-[#3d3932] text-[#D8CFBC] text-sm font-mono">
                Chain:
            </div>
            <div className="w-full flex items-center justify-center px-3 py-1 rounded bg-[#2c2c2c] border border-[#3d3932] text-[#D8CFBC] text-sm font-mono">
                {chain.name}
            </div>
        </div>

        {/* balance */}
        <div className="w-full flex justify-start items-center gap-x-3">
            <div className="flex items-center justify-center px-3 py-1 rounded bg-[#2c2c2c] border border-[#3d3932] text-[#D8CFBC] text-sm font-mono">
                Balance:
            </div>
            <div className="w-full flex items-center justify-center px-3 py-1 rounded bg-[#2c2c2c] border border-[#3d3932] text-[#D8CFBC] text-sm font-mono">
                {formatUnits(balance.value, balance.decimals || 18)} {balance.symbol}
            </div>
        </div>

        {/* action buttons */}
        <div className="w-full flex justify-center items-center gap-x-3 mt-8">
            <div
                className="flex items-center justify-center px-5 py-1.5 rounded bg-[#2c2c2c] hover:bg-[#3c3c3c] transition-colors duration-200 ease-in-out border border-[#D8CFBC] text-[#D8CFBC] text-sm font-mono cursor-pointer"
                onClick={onClick}
            >
                Buy me a coffee
            </div>
            <div
                className="flex items-center justify-center px-5 py-1.5 rounded bg-[#fb2c3656] hover:bg-[#fb2c3675] transition-colors duration-200 ease-in-out border border-red-400 text-[#D8CFBC] text-sm font-mono cursor-pointer"
                onClick={disconnect}
            >
                Disconnect
            </div>
        </div>
    </div>
}

interface ConnectingProps {
    ref?: React.Ref<HTMLDivElement>
}

export const Connecting = ({ ref }: ConnectingProps) => {
    return (
        <div ref={ref} className="flex justify-center items-center py-4">
            <svg
                className="animate-spin h-6 w-6 text-[#D8CFBC]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
            </svg>
        </div>
    );
};