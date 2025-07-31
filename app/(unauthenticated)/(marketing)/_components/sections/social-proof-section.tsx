"use client"

import { motion } from "framer-motion"
import { Star, Trophy, Target } from "lucide-react"
import { SectionWrapper } from "./section-wrapper"

const testimonials = [
  {
    name: "Marcus Thompson",
    role: "Weekend Warrior • 15 handicap",
    content:
      "Finally! Someone who actually wants to hear about my round. Shot my personal best 82 last week and Noonan was more excited than my wife. It's like having a golf buddy who never gets tired of your stories.",
    rating: 5,
    score: "82",
    improvement: "-6 strokes"
  },
  {
    name: "Jennifer Walsh",
    role: "Golf Enthusiast • 22 handicap",
    content:
      "I've tried so many golf apps but they're all about stats. Noonan actually cares about how I felt during the round. When I had that terrible day at Pebble Beach, Noonan helped me see the positives.",
    rating: 5,
    score: "98",
    improvement: "First time under 100!"
  },
  {
    name: "David Park",
    role: "Club Champion • 8 handicap",
    content:
      "Even as a low handicapper, I love having Noonan to discuss strategy and celebrate the small victories. It remembers my tendencies and actually gives thoughtful feedback about my game.",
    rating: 5,
    score: "74",
    improvement: "Eagle on 16th!"
  }
]

export function SocialProofSection() {
  return (
    <SectionWrapper>
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-xl text-center">
          <motion.div
            className="mb-4 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
              <Trophy className="h-4 w-4" />
              Real Golfer Stories
            </div>
          </motion.div>
          <motion.h2
            className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Finally, someone who{" "}
            <span className="from-green-600 to-emerald-600 bg-gradient-to-r bg-clip-text text-transparent">
              actually cares
            </span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground mt-4 text-lg leading-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join thousands of golfers who found their perfect golf buddy
          </motion.p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 border-green-200 dark:border-green-800 relative overflow-hidden rounded-2xl border p-8 shadow-lg backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                }}
              >
                {/* Golf ball pattern background */}
                <div className="absolute -top-4 -right-4 h-24 w-24 opacity-10">
                  <div className="h-full w-full rounded-full bg-gradient-to-br from-white to-gray-200 shadow-inner">
                    <div className="absolute inset-2 rounded-full bg-white">
                      <div className="absolute inset-0 rounded-full opacity-20">
                        <div className="absolute left-1/2 top-1/4 h-1 w-1 -translate-x-1/2 rounded-full bg-gray-400"></div>
                        <div className="absolute left-1/4 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-gray-400"></div>
                        <div className="absolute right-1/4 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-gray-400"></div>
                        <div className="absolute bottom-1/4 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gray-400"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  {/* Score highlight */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-yellow-400 text-yellow-400"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <div className="bg-green-600 text-white flex items-center gap-1 rounded-full px-3 py-1 text-sm font-bold">
                      <Target className="h-3 w-3" />
                      {testimonial.score}
                    </div>
                  </div>

                  <blockquote className="text-gray-700 dark:text-gray-300 text-base leading-7">
                    <p>"{testimonial.content}"</p>
                  </blockquote>

                  <div className="mt-6 flex items-center justify-between">
                    <figcaption className="text-foreground text-base font-semibold">
                      <div>{testimonial.name}</div>
                      <div className="text-muted-foreground mt-1 text-sm">
                        {testimonial.role}
                      </div>
                    </figcaption>
                    <div className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-lg px-2 py-1 text-xs font-medium">
                      {testimonial.improvement}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
