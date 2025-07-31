"use client"

import { motion } from "framer-motion"
import { MessageCircle, Target, Heart, Trophy, Play } from "lucide-react"
import { useState } from "react"
import { SectionWrapper } from "./section-wrapper"

export function VideoSection() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <SectionWrapper>
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            className="mb-4 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
              <Play className="h-4 w-4" />
              See Noonan in Action
            </div>
          </motion.div>
          <motion.h2
            className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Experience the{" "}
            <span className="from-green-600 to-emerald-600 bg-gradient-to-r bg-clip-text text-transparent">
              golf buddy difference
            </span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground mt-4 text-lg leading-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Watch real golfers share their rounds with Noonan and see why it's different
          </motion.p>
        </div>

        <motion.div
          className="mx-auto mt-16 max-w-4xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div
            className="group bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 relative aspect-video cursor-pointer overflow-hidden rounded-2xl shadow-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Golf Course Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-repeat" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>

            {/* Chat Conversation Preview */}
            <div className="absolute inset-0 flex flex-col justify-center p-8">
              <motion.div
                className="bg-white/90 dark:bg-gray-900/90 max-w-md rounded-2xl p-6 shadow-xl backdrop-blur-sm"
                animate={{
                  opacity: isHovered ? 0.7 : 1,
                  scale: isHovered ? 0.95 : 1
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="bg-green-600 flex h-10 w-10 items-center justify-center rounded-full text-white">
                    <span className="text-sm font-bold">N</span>
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-gray-100 font-semibold">Noonan</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">Your golf buddy</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                    <p className="text-gray-700 dark:text-gray-300">
                      "Just shot 89 at Pine Valley today! Not my best round but at least I didn't lose any balls 😅"
                    </p>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-3">
                    <p className="text-green-800 dark:text-green-300">
                      "Hey, 89 at Pine Valley is solid! That course is tough. Tell me about the front nine - how'd you handle those tricky approach shots?"
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Play Button */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                className="bg-white/20 text-white flex h-20 w-20 items-center justify-center rounded-full shadow-2xl backdrop-blur-md ring-2 ring-white/30"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Play className="ml-1 h-8 w-8" fill="currentColor" />
              </motion.button>
            </motion.div>

            {/* Video Stats */}
            <div className="from-black/60 absolute right-0 bottom-0 left-0 bg-gradient-to-t to-transparent p-6">
              <div className="text-white flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Noonan Demo</h3>
                  <p className="text-white/80 mt-1 text-sm">
                    See real conversations with golfers
                  </p>
                </div>
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>Chat</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>Cares</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature badges */}
          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {[
              { text: "⛳ Round Tracking", icon: Target },
              { text: "💬 AI Conversations", icon: MessageCircle },
              { text: "🏆 Progress Stats", icon: Trophy },
              { text: "❤️ Actually Cares", icon: Heart },
              { text: "🎯 Personal Coach", icon: Target }
            ].map((feature, index) => (
              <motion.span
                key={feature.text}
                className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium shadow-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: 0.5 + index * 0.05,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {feature.text}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
