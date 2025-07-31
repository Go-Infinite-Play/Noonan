# Noonan - Your Golf Buddy Who Actually Cares

Finally, someone who genuinely cares about your golf rounds. Track your game and chat with Noonan, your AI golf buddy who remembers your history and responds meaningfully to your golf experiences.

## What is Noonan?

Noonan is the golf buddy you've always wanted - someone who:
- **Actually listens** when you talk about your round
- **Remembers** your previous games and progress  
- **Celebrates** your victories and offers encouragement during tough rounds
- **Provides meaningful feedback** about your golf journey

Because let's face it - nobody else really wants to hear about that eagle you made on the 7th hole.

## Features

- 🏌️ **Round Tracking**: Log your golf rounds with course, score, and notes
- 💬 **Chat with Noonan**: Your AI golf buddy who genuinely cares about your game
- 📊 **Progress Tracking**: See your improvement over time with detailed statistics
- 🆓 **Free to Start**: Log 3 rounds free, upgrade to Pro for unlimited rounds
- 🧠 **Memory**: Noonan remembers your golf history and references it in conversations
- 📱 **Modern Interface**: Clean, golf-focused design that's easy to use

## Getting Started

1. Clone this repository
2. Copy `.env.example` to `.env.local` and add your environment variables
3. Run `npm install` to install dependencies
4. Run `npm run db:local` to start the local database
5. Run `npm run dev` to start the development server
6. Visit `http://localhost:3000` and start logging your rounds!

## Environment Variables

```bash
# Database
DATABASE_URL=

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup

# AI (Claude)
ANTHROPIC_API_KEY=

# Payments (Stripe)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PAYMENT_LINK_YEARLY=
NEXT_PUBLIC_STRIPE_PAYMENT_LINK_MONTHLY=
```

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Shadcn/ui, Framer Motion
- **Backend**: PostgreSQL, Drizzle ORM, Server Actions
- **Authentication**: Clerk
- **AI**: Claude (Anthropic)
- **Payments**: Stripe
- **Deployment**: Vercel

## Pricing

- **Free Plan**: 3 rounds + chat with Noonan
- **Pro Plan ($9/month)**: Unlimited rounds + advanced stats + priority responses

## Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:local     # Start local Supabase
npm run db:generate  # Generate migrations
npm run db:migrate   # Run migrations

# Code Quality
npm run lint         # Run ESLint
npm run types        # Check TypeScript
npm run format:write # Format with Prettier
```

## Support

Questions about your golf game? Ask Noonan when you sign up! Technical questions? Open an issue on GitHub.

---

*Finally, someone who cares what you shot.*