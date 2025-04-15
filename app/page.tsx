// Modern Next.js 15+ starter home page using React 19 features
import React from "react"

export default function HomePage() {
  return (
    <main className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center">
      <div className="bg-card max-w-2xl rounded-xl p-8 shadow-lg">
        <h1 className="mb-4 text-4xl font-bold">
          Welcome to Your Modern Starter App 🚀
        </h1>
        <p className="mb-4 text-lg">
          This is a clean, up-to-date Next.js 15+ starter template, ready for
          customization. It uses the latest React 19, Tailwind CSS 4, and
          TypeScript best practices.
        </p>
        <ul className="mb-2 list-inside list-disc text-base">
          <li>App Router (app/ directory)</li>
          <li>TypeScript & ESLint/Prettier setup</li>
          <li>Tailwind CSS 4 & PostCSS</li>
          <li>Radix UI, Clerk, Drizzle ORM, Stripe, PostHog</li>
        </ul>
        <p className="text-muted-foreground mt-6 text-sm">
          Edit <code>app/page.tsx</code> to get started!
        </p>
      </div>
    </main>
  )
}
