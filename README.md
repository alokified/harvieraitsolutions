# Harviera IT Solutions

A modern Next.js 14 application built with TypeScript and the App Router.

## Tech Stack

### Core

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **React 19** - UI library

### Styling

- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Re-usable component library
- **Framer Motion** - Animation library
- **lucide-react** - Icon library

### Forms & Validation

- **react-hook-form** - Form handling
- **zod** - Schema validation
- **@hookform/resolvers** - Form validation integration

### Content & Data Visualization

- **Contentlayer + MDX** - Content management
- **Recharts** - Data visualization

### Utilities

- **Fuse.js** - Fuzzy search
- **class-variance-authority** - Component variants
- **tailwind-merge** - Tailwind class merging

### Backend & API

- **Mongoose** - MongoDB object modeling
- **Nodemailer** - Email sending
- **@vercel/og** - Open Graph image generation

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Pre-commit linting

### Testing

- **Vitest** - Unit testing framework
- **@testing-library/react** - React testing utilities
- **@testing-library/jest-dom** - Custom matchers
- **@testing-library/user-event** - User interaction simulation

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
```

### Development

```bash
# Start development server
pnpm dev

# Run linting
pnpm lint

# Run tests
pnpm test

# Format code
pnpm format
```

### Build

```bash
# Create production build
pnpm build

# Start production server
pnpm start
```

## Project Structure

```
harviera-it-solutions/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── lib/             # Utility functions
│   └── __tests__/       # Test files
├── content/             # MDX content files
├── public/              # Static assets
├── .husky/              # Git hooks
└── contentlayer.config.ts
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting
- `pnpm test` - Run tests
- `pnpm test:ui` - Run tests with UI

## License

Private
