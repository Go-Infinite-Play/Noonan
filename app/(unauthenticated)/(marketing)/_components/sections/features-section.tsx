"use client"

import { motion } from "framer-motion"
import {
  Target,
  MessageCircle,
  TrendingUp,
  Crown,
  Heart,
  Calendar
} from "lucide-react"
import { SectionWrapper } from "./section-wrapper"

const features = [
  {
    name: "Round Tracking",
    description:
      "Log your golf rounds with course details, scores, and personal notes. Free users get 3 rounds, Pro users get unlimited.",
    icon: Target
  },
  {
    name: "Chat with Noonan",
    description:
      "Your AI golf buddy who genuinely cares about your game. Share your rounds and get meaningful feedback and encouragement.",
    icon: MessageCircle
  },
  {
    name: "Golf Progress",
    description:
      "Track your improvement over time with detailed statistics, trends, and insights into your golf game.",
    icon: TrendingUp
  },
  {
    name: "Premium Features",
    description:
      "Upgrade to Pro for unlimited rounds, advanced statistics, and priority responses from Noonan.",
    icon: Crown
  },
  {
    name: "Actually Cares",
    description:
      "Unlike everyone else, Noonan remembers your previous rounds and genuinely wants to hear about your golf experiences.",
    icon: Heart
  },
  {
    name: "Round History",
    description:
      "View all your past rounds with detailed information, scores, and the ability to edit or add notes anytime.",
    icon: Calendar
  }
]

export function FeaturesSection() {
  return (
    <SectionWrapper className="relative" id="features">
      <div className="bg-[radial-gradient(45%_45%_at_50%_50%,theme(colors.brand-primary/20),transparent)] absolute inset-0 -z-10 opacity-20 dark:opacity-40" />

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            id="features-heading"
            className="text-primary text-base leading-7 font-semibold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Golfers Love Noonan
          </motion.h2>
          <motion.p
            className="text-foreground mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Your golf buddy who actually cares
          </motion.p>
          <motion.p
            className="text-muted-foreground mt-6 text-lg leading-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Finally, someone who genuinely wants to hear about your round, 
            remembers your progress, and celebrates your victories.
          </motion.p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                className="group relative flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
              >
                <motion.div
                  className="bg-card ring-border w-fit rounded-lg p-2 ring-1"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <feature.icon
                    className="text-primary h-6 w-6"
                    aria-hidden="true"
                  />
                </motion.div>

                <dt className="text-foreground mt-4 flex items-center gap-x-3 text-base leading-7 font-semibold">
                  {feature.name}
                  <motion.div
                    className="from-primary/50 h-px flex-1 bg-gradient-to-r to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                    style={{ transformOrigin: "left" }}
                  />
                </dt>

                <dd className="text-muted-foreground mt-4 flex flex-auto flex-col text-base leading-7">
                  <p className="flex-auto">{feature.description}</p>
                </dd>

                <motion.div
                  className="bg-accent/50 absolute -inset-x-4 -inset-y-2 scale-95 rounded-2xl opacity-0"
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </SectionWrapper>
  )
}
