"use client"

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { HeroHeader } from './header'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main className="overflow-hidden">
                <section className="bg-linear-to-b to-muted from-background">
                    <div className="relative py-36">
                        <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
                            <div className="md:w-1/2">
                                <div>
                                    <h1 className="max-w-md text-balance text-5xl font-medium md:text-6xl">Smart Banquet Management, Simplified.</h1>
                                    <p className="text-muted-foreground my-8 max-w-2xl text-balance text-xl">Wadii streamlines event operations from inquiries and bookings to billing, communications, and analytics so your team can focus on delivering exceptional experiences.</p>

                                    <div className="flex items-center gap-3">
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        >
                                            <Button
                                                asChild
                                                size="lg"
                                                className="pr-4.5 relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group bg-[#111A2D] hover:bg-[#0f1520] text-white">
                                                <Link href="#link" className="relative z-10 flex items-center gap-2">
                                                    <motion.div
                                                        className="absolute inset-0"
                                                        animate={{
                                                            background: [
                                                                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                                                                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)'
                                                            ],
                                                            backgroundPosition: ['0% 0%', '100% 0%', '0% 0%']
                                                        }}
                                                        transition={{
                                                            duration: 3,
                                                            repeat: Infinity,
                                                            ease: "linear"
                                                        }}
                                                        style={{
                                                            backgroundSize: '200% 100%'
                                                        }}
                                                    />
                                                    <span className="text-nowrap">Explore Features</span>
                                                    <ChevronRight className="opacity-50" />
                                                </Link>
                                            </Button>
                                        </motion.div>
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        >
                                            <Button
                                                key={2}
                                                asChild
                                                size="lg"
                                                variant="outline"
                                                className="pl-5 relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group bg-[#111A2D] hover:bg-[#0f1520] text-white border-[#111A2D] hover:border-[#0f1520]">
                                                <Link href="#link" className="relative z-10 flex items-center gap-2">
                                                    <motion.div
                                                        className="absolute inset-0"
                                                        animate={{
                                                            background: [
                                                                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                                                                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)'
                                                            ],
                                                            backgroundPosition: ['0% 0%', '100% 0%', '0% 0%']
                                                        }}
                                                        transition={{
                                                            duration: 3,
                                                            repeat: Infinity,
                                                            ease: "linear"
                                                        }}
                                                        style={{
                                                            backgroundSize: '200% 100%'
                                                        }}
                                                    />
                                                    {/* <CirclePlay className="fill-primary/25 stroke-primary" /> */}
                                                    <span className="text-nowrap">Get started today</span>
                                                </Link>
                                            </Button>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* <div className="mt-10">
                                    <p className="text-muted-foreground">Trusted by teams at :</p>
                                    <div className="mt-6 grid max-w-sm grid-cols-3 gap-6">
                                        <div className="flex">
                                            <Image
                                                className="h-4 w-fit"
                                                src="https://html.tailus.io/blocks/customers/column.svg"
                                                alt="Column Logo"
                                                height={16}
                                                width={100}
                                            />
                                        </div>
                                        <div className="flex">
                                            <Image
                                                className="h-5 w-fit"
                                                src="https://html.tailus.io/blocks/customers/nvidia.svg"
                                                alt="Nvidia Logo"
                                                height={20}
                                                width={100}
                                            />
                                        </div>
                                        <div className="flex">
                                            <Image
                                                className="h-4 w-fit"
                                                src="https://html.tailus.io/blocks/customers/github.svg"
                                                alt="GitHub Logo"
                                                height={16}
                                                width={100}
                                            />
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>

                        <div className="perspective-near mt-24 translate-x-12 md:absolute md:-right-6 md:bottom-16 md:left-1/2 md:top-40 md:mt-0 md:translate-x-0">
                            <div className="before:bg-foreground/5 before:shadow-2xl relative h-full before:absolute before:-inset-y-4 before:-left-8 before:top-0 before:w-20 before:skew-x-6 before:rounded-[calc(var(--radius)+1rem)] before:blur-xl">
                                <div className="bg-background rounded-(--radius) shadow-foreground/10 ring-foreground/5 relative h-full -translate-y-12 skew-x-6 overflow-hidden shadow-2xl">
                                    <Image
                                        src="/hero/dashboard.png"
                                        alt="hero dashboard"
                                        width="2880"
                                        height="1842"
                                        className="object-top-left size-full object-cover"
                                    />
                                    <motion.div
                                        className="absolute inset-0 z-10 pointer-events-none"
                                        animate={{
                                            x: ['-100%', '200%'],
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "linear",
                                            repeatDelay: 0
                                        }}
                                        style={{
                                            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 40%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.4) 60%, transparent 100%)',
                    width: '100%',
                    height: '100%'
                }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
