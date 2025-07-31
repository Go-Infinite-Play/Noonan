import { pgEnum, pgTable, text, timestamp, uuid, integer } from "drizzle-orm/pg-core"

export const membership = pgEnum("membership", ["free", "pro"])

export const customers = pgTable("customers", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").unique().notNull(),
  membership: membership("membership").default("free").notNull(),
  stripeCustomerId: text("stripe_customer_id").unique(),
  stripeSubscriptionId: text("stripe_subscription_id").unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
})

export const golfCourses = pgTable("golf_courses", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  location: text("location"),
  par: integer("par"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
})

export const golfRounds = pgTable("golf_rounds", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  courseId: uuid("course_id").references(() => golfCourses.id),
  courseName: text("course_name").notNull(), // Allow manual course entry
  datePlayed: timestamp("date_played").notNull(),
  score: integer("score").notNull(),
  par: integer("par"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
})

export const conversations = pgTable("conversations", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  roundId: uuid("round_id").references(() => golfRounds.id),
  message: text("message").notNull(),
  response: text("response").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
})

export type InsertCustomer = typeof customers.$inferInsert
export type SelectCustomer = typeof customers.$inferSelect
export type InsertGolfCourse = typeof golfCourses.$inferInsert
export type SelectGolfCourse = typeof golfCourses.$inferSelect
export type InsertGolfRound = typeof golfRounds.$inferInsert
export type SelectGolfRound = typeof golfRounds.$inferSelect
export type InsertConversation = typeof conversations.$inferInsert
export type SelectConversation = typeof conversations.$inferSelect
