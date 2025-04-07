/*
<ai_context>
Contains server actions related to notifications in the dead man's switch application.
</ai_context>
*/

import { db } from "@/db/db"
import { emergencyContactsTable, userCheckinsTable } from "@/db/schema"
import { auth } from "@clerk/nextjs"
import { and, eq, lt } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function checkOverdueUsersAndNotify() {
  // Get all users with overdue check-ins
  const overdueUsers = await db
    .select()
    .from(userCheckinsTable)
    .where(lt(userCheckinsTable.nextCheckinDue, new Date()))

  // For each overdue user, get their emergency contacts and send notifications
  for (const user of overdueUsers) {
    const contacts = await db
      .select()
      .from(emergencyContactsTable)
      .where(eq(emergencyContactsTable.userId, user.userId))

    for (const contact of contacts) {
      await sendNotification(contact, user)
    }
  }
}

async function sendNotification(
  contact: typeof emergencyContactsTable.$inferSelect,
  user: typeof userCheckinsTable.$inferSelect
) {
  try {
    // Email notification via Resend
    if (contact.email) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'noreply@panggil.app',
          to: contact.email,
          subject: `Urgent: ${user.userId} has missed check-in`,
          html: `<p>Dear ${contact.name},</p>
                 <p>This is an automated notification to inform you that ${user.userId} has missed their scheduled check-in.</p>
                 <p>Please follow up with them as soon as possible.</p>`
        })
      })
    }

    // SMS notification via Twilio
    if (contact.phone) {
      await fetch(`https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64')}`
        },
        body: new URLSearchParams({
          From: process.env.TWILIO_PHONE_NUMBER,
          To: contact.phone,
          Body: `URGENT: ${user.userId} has missed check-in. Please follow up.`
        })
      })
    }
  } catch (error) {
    console.error('Failed to send notification:', error)
    throw error
  }
}