'use client';
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import user from "../../data/user.data";

export default function HeroSection() {
    return (
        <section className="relative min-h-screen w-full flex items-center justify-center bg-ink">
            <div className="text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className={cn(
                        "text-6xl md:text-8xl font-semibold tracking-tight",
                        "bg-linear-to-b from-primary-light/90 to-primary-light/40 bg-clip-text text-transparent"
                    )}>
                        {user.name}
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    className="mt-8"
                >
                    <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border border-primary-light/20 shadow-lg">
                        <Image
                            src={user.image}
                            alt={user.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-8 text-primary-light/50 text-lg max-w-md mx-auto"
                >
                    Developer & Designer
                </motion.p>
            </div>
        </section>
    );
}
