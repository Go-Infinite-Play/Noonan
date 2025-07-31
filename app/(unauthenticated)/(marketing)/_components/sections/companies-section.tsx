"use client"

import { motion } from "framer-motion"
import { Target, MessageCircle, Brain, Zap } from "lucide-react"
import { SectionWrapper } from "./section-wrapper"

const stats = [
  { label: "Rounds Tracked", value: "10,000+", icon: Target },
  { label: "Happy Golfers", value: "2,500+", icon: MessageCircle },
  { label: "AI Conversations", value: "50,000+", icon: Brain }
]

const features = [
  "⛳ Round Tracking",
  "🤖 AI Conversations", 
  "📊 Smart Analytics",
  "🏆 Progress Tracking",
  "💬 Genuine Care",
  "🎯 Personal Coach",
  "📱 Mobile Ready",
  "⚡ Lightning Fast"
]

export function CompaniesSection() {
  return (
    <SectionWrapper>
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="mb-4 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
              <Zap className="h-4 w-4" />
              Powered by AI
            </div>
          </motion.div>
          <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            Your golf buddy gets{" "}
            <span className="from-green-600 to-emerald-600 bg-gradient-to-r bg-clip-text text-transparent">
              smarter every day
            </span>
          </h2>
          <p className="text-muted-foreground mt-4 text-lg leading-8">
            Advanced AI technology that understands golf and actually cares about your progress
          </p>
        </motion.div>

        {/* Features Marquee */}
        <div className="relative mt-16">
          <div className="from-background absolute top-0 bottom-0 left-0 z-10 w-20 bg-gradient-to-r to-transparent" />
          <div className="from-background absolute top-0 right-0 bottom-0 z-10 w-20 bg-gradient-to-l to-transparent" />

          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-6 pr-6"
              animate={{ x: ["0%", "-100%"] }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {[...features, ...features].map((feature, index) => (
                <motion.div
                  key={`${feature}-${index}`}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 flex items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold whitespace-nowrap shadow-sm"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {feature}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <motion.dl
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 text-center sm:mt-20 sm:grid-cols-3 sm:gap-y-16 lg:mx-0 lg:max-w-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800 mx-auto flex max-w-xs flex-col gap-y-4 rounded-2xl border p-8 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <motion.div
                className="bg-green-600 mx-auto flex h-12 w-12 items-center justify-center rounded-full text-white"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.4 + index * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
              >
                <stat.icon className="h-6 w-6" />
              </motion.div>
              <dd className="text-foreground order-first text-3xl font-bold tracking-tight sm:text-4xl">
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="from-green-600 to-emerald-600 inline-block bg-gradient-to-r bg-clip-text text-transparent"
                >
                  {stat.value}
                </motion.span>
              </dd>
              <dt className="text-muted-foreground text-base font-medium leading-7">
                {stat.label}
              </dt>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </SectionWrapper>
  )
}
