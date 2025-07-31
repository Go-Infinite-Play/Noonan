# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Standard Workflow

1. First, think through the problem, read the codebase for relevant files and write a plan in tasks/todo.md.
2. The plan should have a list of to-do items that you can check off as you complete them.
3. Before you begin working, check in with me, and I will verify the plan.
4. Then begin working on the to-do items, marking them as complete as you go.
5. Finally, add a review section to the todo.md file with a summary of the changes you made and any other relevant information.

## Commands

### Development
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server

### Code Quality
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run types` - Run TypeScript type checking
- `npm run format:write` - Format code with Prettier
- `npm run clean` - Run both lint:fix and format:write

### Database
- `npx drizzle-kit push` - Push schema changes to database
- `npm run db:generate` - Generate migration files
- `npm run db:migrate` - Run migrations
- `npm run db:seed` - Seed database
- `npm run db:local` - Start local Supabase instance

### Testing
- `npm run test` - Run all tests (unit + e2e)
- `npm run test:unit` - Run Jest unit tests
- `npm run test:e2e` - Run Playwright e2e tests

### Shadcn UI Components
- `npx shadcn@latest add [component-name]` - Install new Shadcn UI components

## Architecture

This is a Next.js 15 SaaS template using the App Router with clear separation between authenticated and unauthenticated routes.

### Route Structure
- `/app/(unauthenticated)` - Public routes
  - `(marketing)` - Landing pages, pricing, features
  - `(auth)` - Login and signup flows
- `/app/(authenticated)` - Protected routes requiring Clerk auth
  - `dashboard` - Main application with account, billing, support sections
- `/app/api` - API routes including Stripe webhook handler

### Key Patterns
- **Server Actions** in `/actions` for data mutations (customers, Stripe operations)
- **Database Schema** in `/db/schema` using Drizzle ORM with PostgreSQL
- **UI Components** in `/components/ui` from Shadcn UI library
- **Authentication** handled by Clerk middleware with protected route groups
- **Payments** integrated via Stripe with webhook handling

### Data Flow
1. Authentication state managed by Clerk (`@clerk/nextjs`)
2. Customer data stored in PostgreSQL via Drizzle ORM
3. Stripe integration for subscription management
4. Server actions handle all data mutations with proper auth checks

### Environment Variables Required
- `DATABASE_URL` - PostgreSQL database connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- `CLERK_SECRET_KEY` - Clerk secret key
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login` - Clerk sign in URL
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup` - Clerk sign up URL
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook endpoint secret
- `NEXT_PUBLIC_STRIPE_PAYMENT_LINK_YEARLY` - Stripe yearly payment link
- `NEXT_PUBLIC_STRIPE_PAYMENT_LINK_MONTHLY` - Stripe monthly payment link

## Additional Commands
- `npm run format:check` - Check code formatting with Prettier
- `npm run analyze` - Analyze bundle size with webpack-bundle-analyzer