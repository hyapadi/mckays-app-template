# Next.js 15+ Modern Starter

A clean, up-to-date starter template using Next.js 15+, React 19, Tailwind CSS 4, TypeScript, and best practices.

## Features
- App Router (app/ directory)
- React 19 and Server Components
- Tailwind CSS 4, PostCSS, and Radix UI
- TypeScript, ESLint, Prettier, Husky
- Ready for Clerk (auth), Drizzle ORM, Stripe, PostHog

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
2. **Set up environment variables:**
   Copy `.env.example` to `.env` and fill in your secrets.

3. **Run the dev server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open http://localhost:3000** to see your app.

## Project Structure
- `app/` — Main app directory (routing, pages, layouts)
- `components/` — Reusable UI components
- `lib/` — Utility libraries
- `db/` — Database and ORM setup

## Linting & Formatting
- `npm run lint` — Check code style
- `npm run lint:fix` — Auto-fix lint issues
- `npm run format:write` — Format code with Prettier

## Deployment
Deploy easily to Vercel or any Node.js host.

---

Built with ❤️ using the latest Next.js ecosystem. Start building your app by editing `app/page.tsx`!

1. Clone the repository
2. Copy `.env.example` to `.env.local` and fill in the environment variables from above
3. Run `npm install` to install dependencies
4. Run `npm run dev` to run the app locally
