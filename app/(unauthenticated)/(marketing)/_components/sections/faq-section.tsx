"use client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible"
import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import { useState } from "react"
import { SectionWrapper } from "./section-wrapper"

const faqs = [
  {
    question: "What is Noonan exactly?",
    answer:
      "Noonan is your AI golf buddy who genuinely cares about your golf game. Unlike friends and family who tune out when you talk about your round, Noonan remembers your history, celebrates your successes, and offers encouragement when you have tough rounds."
  },
  {
    question: "How does the free plan work?",
    answer:
      "You can log up to 3 golf rounds for free and chat with Noonan about them. This gives you a taste of having someone who actually cares about your golf game. If you want unlimited rounds and enhanced features, upgrade to Pro for $9/month."
  },
  {
    question: "What makes Noonan different from other golf apps?",
    answer:
      "Most golf apps focus on stats and scorekeeping. Noonan focuses on the emotional side - having someone who genuinely cares about your experience. Noonan remembers your previous rounds and provides personalized, caring responses about your golf journey."
  },
  {
    question: "Does Noonan really remember my rounds?",
    answer:
      "Yes! Noonan has access to your entire golf history and references your previous rounds in conversations. Whether you're improving, struggling, or had a breakthrough round, Noonan knows your journey and responds accordingly."
  },
  {
    question: "What's included in the Pro plan?",
    answer:
      "Pro members get unlimited round logging, advanced statistics, round comparison features, detailed progress tracking, priority responses from Noonan, and the ability to export your golf data."
  },
  {
    question: "Can I cancel my Pro subscription anytime?",
    answer:
      "Absolutely! You can cancel your Pro subscription at any time with no questions asked. Your existing rounds will remain accessible, but you'll be limited to the free plan's 3-round limit for new entries."
  }
]

export function FAQSection() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (question: string) => {
    setOpenItems(prev =>
      prev.includes(question)
        ? prev.filter(item => item !== question)
        : [...prev, question]
    )
  }

  return (
    <SectionWrapper id="faq">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl">
          <motion.h2
            className="text-foreground text-2xl leading-10 font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Common questions about Noonan
          </motion.h2>
          <motion.p
            className="text-muted-foreground mt-6 text-base leading-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Everything you need to know about your new golf buddy. Have other questions? 
            Just ask Noonan when you sign up!
          </motion.p>
          <dl className="mt-10 space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Collapsible
                  open={openItems.includes(faq.question)}
                  onOpenChange={() => toggleItem(faq.question)}
                >
                  <CollapsibleTrigger className="flex w-full items-start justify-between text-left">
                    <span className="text-foreground text-base leading-7 font-semibold">
                      {faq.question}
                    </span>
                    <motion.span
                      className="ml-6 flex h-7 items-center"
                      animate={{
                        rotate: openItems.includes(faq.question) ? 45 : 0
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <Plus
                        className="text-muted-foreground h-6 w-6"
                        aria-hidden="true"
                      />
                    </motion.span>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 pr-12">
                    <motion.p
                      className="text-muted-foreground text-base leading-7"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {faq.answer}
                    </motion.p>
                  </CollapsibleContent>
                </Collapsible>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </SectionWrapper>
  )
}
