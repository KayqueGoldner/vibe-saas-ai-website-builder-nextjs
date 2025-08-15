# Vibe SaaS AI Website Builder

> A modern SaaS platform for building websites using AI, built with Next.js 15, React 19, Prisma, and tRPC.

![Application Screenshot](/preview/vibe-saas-ai-website-builder.png "Application Screenshot")
![Application Screenshot](/preview/vibe-saas-ai-website-builder-demo.png "Application Screenshot")
![Application Screenshot](/preview/vibe-saas-ai-website-builder-code.png "Application Screenshot")

## 🚀 Features

- **AI-Powered Website Building**: Create websites using AI assistance
- **Authentication**: Secure authentication via Clerk
- **Modern UI**: Built with TailwindCSS and Radix UI components
- **Real-time Updates**: Live preview and updates using React 19
- **Theme Support**: Dark/Light mode support via next-themes
- **Form Handling**: Robust form management with react-hook-form and zod validation
- **API Layer**: Type-safe API using tRPC and React Query
- **Database**: Prisma ORM with PostgreSQL
- **Rate Limiting**: Request throttling with rate-limiter-flexible
- **Notifications**: Toast notifications using Sonner
- **Code Interpretation**: AI code interpretation via E2B
- **Task Automation**: Background tasks with Inngest

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: tRPC, Prisma, PostgreSQL
- **Authentication**: Clerk
- **UI/UX**: TailwindCSS, Radix UI, Lucide Icons
- **State Management**: TanStack React Query
- **Form Handling**: React Hook Form, Zod
- **Developer Tools**: ESLint, Prettier

## 📂 Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # UI components
├── hooks/              # Custom React hooks
├── inngest/            # Background job configurations
├── lib/                # Utility functions
├── modules/            # Feature modules
└── trpc/               # tRPC setup and routers
```

## ⚡ Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Create a `.env` file with your configuration

3. **Set up the database**
   ```bash
   npx prisma db push
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📦 Notable Dependencies

- `@trpc/server` & `@trpc/client`: Type-safe API
- `@clerk/nextjs`: Authentication
- `@prisma/client`: Database ORM
- `@radix-ui/*`: UI components
- `@tanstack/react-query`: Data fetching
- `next-themes`: Theme management
- `react-hook-form`: Form handling
- `zod`: Schema validation
- `inngest`: Background jobs
- `@e2b/code-interpreter`: AI code interpretation

## 🔐 Environment Variables

Create a `.env` file in the root with the following:

```env
NEXT_PUBLIC_APP_URL="http://localhost:3000"

DATABASE_URL=""

# openai
OPENAI_API_KEY=""

# e2b
E2B_API_KEY=""

# clerk
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

```

## 💳 Premium & Billing

- Upgrade to premium plans via Clerk Billing
- Subscription management and billing portal

## 🤝 Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to your branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

