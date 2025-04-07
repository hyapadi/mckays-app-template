/*
<ai_context>
Contains server actions related to user check-ins in the DB.
</ai_context>
*/

import { db } from "@/db/db"
import { userCheckinsTable } from "@/db/schema"
import { auth } from "@clerk/nextjs"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import type { InsertUserCheckin, SelectUserCheckin } from "@/db/schema"

export async function createUserCheckin(
  checkin: Omit<InsertUserCheckin, 'userId' | 'lastCheckin' | 'createdAt' | 'updatedAt'>
) {
  const { userId } = auth()
  if (!userId) throw new Error("Unauthorized")

  const [newCheckin] = await db
    .insert(userCheckinsTable)
    .values({ 
      ...checkin, 
      userId,
      lastCheckin: new Date(),
      nextCheckinDue: calculateNextCheckinDate(checkin.checkinFrequency)
    })
    .returning()

  revalidatePath("/settings")
  return newCheckin
}

export async function getUserCheckin(): Promise<SelectUserCheckin | null> {
  const { userId } = auth()
  if (!userId) throw new Error("Unauthorized")

  const [checkin] = await db
    .select()
    .from(userCheckinsTable)
    .where(eq(userCheckinsTable.userId, userId))
    .limit(1)

  return checkin || null
}

export async function updateUserCheckin() {
  const { userId } = auth()
  if (!userId) throw new Error("Unauthorized")

  const [checkin] = await db
    .select()
    .from(userCheckinsTable)
    .where(eq(userCheckinsTable.userId, userId))
    .limit(1)

  if (!checkin) throw new Error("No checkin record found")

  const [updatedCheckin] = await db
    .update(userCheckinsTable)
    .set({ 
      lastCheckin: new Date(),
      nextCheckinDue: calculateNextCheckinDate(checkin.checkinFrequency)
    })
    .where(eq(userCheckinsTable.userId, userId))
    .returning()

  revalidatePath("/")
  return updatedCheckin
}

function calculateNextCheckinDate(frequency: string): Date {
  const [value, unit] = frequency.split(' ')
  const numValue = parseInt(value)
  
  const date = new Date()
  if (unit.includes('day')) date.setDate(date.getDate() + numValue)
  else if (unit.includes('week')) date.setDate(date.getDate() + (numValue * 7))
  else if (unit.includes('month')) date.setMonth(date.getMonth() + numValue)
  
  return date
}