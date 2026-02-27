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
                    <div className="relative py-24 md:py-36">
                        <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
                            {/* Text content: full-width on mobile, half-width on md+ */}
                            <div className="text-center md:text-left md:w-1/2">
                                <div>
                                    <h1 className="max-w-md mx-auto md:mx-0 text-balance text-5xl font-medium md:text-6xl">
                                        Smart Banquet Management, Simplified.
                                    </h1>
                                    <p className="text-muted-foreground my-8 max-w-2xl text-balance text-xl mx-auto md:mx-0">
                                        Wadii streamlines event operations from inquiries and bookings to billing, communications, and analytics so your team can focus on delivering exceptional experiences.
                                    </p>

                                    <div className="flex items-center justify-center md:justify-start gap-3">
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
                                                            backgroundPosition: ['0% 0%', '100% 0%', '0% 0%']
                                                        }}
                                                        transition={{
                                                            duration: 3,
                                                            repeat: Infinity,
                                                            ease: "linear"
                                                        }}
                                                        style={{
                                                            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
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
                                                asChild
                                                size="lg"
                                                variant="outline"
                                                className="pl-5 relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group bg-[#111A2D] hover:bg-[#0f1520] text-white border-[#111A2D] hover:border-[#0f1520]">
                                                <Link href="#link" className="relative z-10 flex items-center gap-2">
                                                    <motion.div
                                                        className="absolute inset-0"
                                                        animate={{
                                                            backgroundPosition: ['0% 0%', '100% 0%', '0% 0%']
                                                        }}
                                                        transition={{
                                                            duration: 3,
                                                            repeat: Infinity,
                                                            ease: "linear"
                                                        }}
                                                        style={{
                                                            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                                                            backgroundSize: '200% 100%'
                                                        }}
                                                    />
                                                    <span className="text-nowrap">Get started today</span>
                                                </Link>
                                            </Button>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*
                         * MOBILE:  centered below the text, no skew/translate, full width with padding
                         * DESKTOP: absolute positioned right side, with the original skew/perspective effect
                         */}
                        <div className="
                            mt-12 px-6
                            flex justify-center
                            md:perspective-near
                            md:absolute md:-right-6 md:bottom-16 md:left-1/2 md:top-25
                            md:translate-x-0 md:px-0 md:block
                        ">
                            <div className="
                                w-full max-w-sm
                                md:max-w-none md:w-auto
                                md:before:bg-foreground/5 md:before:shadow-2xl
                                md:relative md:h-full
                                md:before:absolute md:before:-inset-y-4 md:before:-left-8 md:before:top-0
                                md:before:w-20 md:before:skew-x-6 md:before:rounded-[calc(var(--radius)+1rem)] md:before:blur-xl
                            ">
                                {/* Card wrapper: no skew on mobile, skewed on desktop */}
                                <div className="
                                    bg-background rounded-(--radius) shadow-foreground/10 ring-foreground/5
                                    relative overflow-hidden shadow-2xl
                                    md:-translate-y-12 md:skew-x-6
                                ">
                                    <Image
                                        src="/hero/dashboard_trial.png"
                                        alt="hero dashboard"
                                        width="2880"
                                        height="1842"
                                        className="object-top-left w-full h-auto object-cover"
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