/*
<ai_context>
Contains server actions related to emergency contacts in the DB.
</ai_context>
*/

import { db } from "@/db/db"
import { emergencyContactsTable } from "@/db/schema"
import { auth } from "@clerk/nextjs"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import type { InsertEmergencyContact, SelectEmergencyContact } from "@/db/schema"

export async function createEmergencyContact(
  contact: Omit<InsertEmergencyContact, 'userId'>
) {
  const { userId } = auth()
  if (!userId) throw new Error("Unauthorized")

  const [newContact] = await db
    .insert(emergencyContactsTable)
    .values({ ...contact, userId })
    .returning()

  revalidatePath("/settings")
  return newContact
}

export async function getEmergencyContacts(): Promise<SelectEmergencyContact[]> {
  const { userId } = auth()
  if (!userId) throw new Error("Unauthorized")

  return db
    .select()
    .from(emergencyContactsTable)
    .where(eq(emergencyContactsTable.userId, userId))
}

export async function deleteEmergencyContact(id: string) {
  const { userId } = auth()
  if (!userId) throw new Error("Unauthorized")

  const [deletedContact] = await db
    .delete(emergencyContactsTable)
    .where(
      and(
        eq(emergencyContactsTable.id, id),
        eq(emergencyContactsTable.userId, userId)
      )
    )
    .returning()

  revalidatePath("/settings")
  return deletedContact
}