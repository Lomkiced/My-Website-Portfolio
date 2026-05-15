# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- **Development**: `npm run dev` - starts the Next.js development server on http://localhost:3000
- **Build**: `npm run build` - creates production build
- **Start Production**: `npm run start` - runs the built application
- **Lint**: `npm run lint` - runs ESLint for code quality checks
- **Type Check**: `npx tsc --noEmit` - runs TypeScript type checking without emitting files

## Project Architecture
This is a Next.js 14 portfolio website using the App Router structure:

### Core Directories
- `src/app/` - Contains all route segments and page components using Next.js 14 App Router
- `src/components/` - Reusable UI components organized by type:
  - `sections/` - Page sections (Hero, About, Experience, Projects, Skills, Certificates, Contact, Footer)
  - `ui/` - Primitive UI components (Button, Input, Textarea, Label, etc.)
  - `animations/` - Animation utilities and effects
  - `backgrounds/` - Background visual effects
  - `providers/` - React context providers
- `src/lib/` - Utility functions, custom hooks, and store configuration
- `src/types/` - TypeScript type declarations
- `src/actions/` - Server actions for form handling and API interactions

### State Management
- Zustand store in `src/lib/store.ts` for global state (theme management)
- Custom hooks in `src/lib/` for shared logic

### Styling & Assets
- Tailwind CSS configuration in `tailwind.config.ts` and `postcss.config.mjs`
- Global styles in `src/app/globals.css`
- Font optimization using `next/font` for Geist font family
- DaisyUI components used for consistent UI elements

### Key Features
- **Email Handling**: Resend integration via `src/actions/send-email.ts`
- **Animations**: Framer Motion for complex interactions, Tailwind CSS transitions for simple effects
- **Icons**: Lucide React and React Icons libraries
- **SEO**: Metadata handled through layout.tsx and individual page configurations
- **Accessibility**: Semantic HTML and ARIA attributes throughout

### Data Flow
- Static data stored in `src/lib/data.ts` (used for skills, experience, projects, certificates)
- Components receive data as props from page components in `src/app/`
- Form data handled via React Hook Form with Zod validation (if implemented) or direct handling
- Email sending occurs through server actions to keep API keys secure

## Coding Conventions
- **Components**: Functional React components with hooks only
- **Styling**: Tailwind utility classes prioritized; use `clsx` and `tailwind-merge` for dynamic class merging
- **TypeScript**: Strict typing for all props, API responses, and Zustand store values
- **File Organization**: Feature-based colocation (components, styles, and logic kept together when relevant)
- **Performance**: 
  - Images optimized using Next.js Image component
  - Fonts loaded via `next/font` for automatic optimization
  - Code splitting handled automatically by Next.js route-based splitting