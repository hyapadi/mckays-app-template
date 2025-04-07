/*
<ai_context>
Defines the database schema for emergency contacts in the dead man's switch application.
</ai_context>
*/

import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const emergencyContactsTable = pgTable("emergency_contacts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  relationship: text("relationship").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertEmergencyContact = typeof emergencyContactsTable.$inferInsert
export type SelectEmergencyContact = typeof emergencyContactsTable.$inferSelect
