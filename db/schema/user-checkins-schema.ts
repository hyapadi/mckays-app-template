/*
<ai_context>
Defines the database schema for user check-ins in the dead man's switch application.
</ai_context>
*/

import { interval, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const userCheckinsTable = pgTable("user_checkins", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull().unique(),
  lastCheckin: timestamp("last_checkin").defaultNow().notNull(),
  checkinFrequency: interval("checkin_frequency").notNull(),
  nextCheckinDue: timestamp("next_checkin_due").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertUserCheckin = typeof userCheckinsTable.$inferInsert
export type SelectUserCheckin = typeof userCheckinsTable.$inferSelect
