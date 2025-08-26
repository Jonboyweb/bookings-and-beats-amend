# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is The Backroom Leeds website - a React + TypeScript application for a hidden speakeasy bar and event space. The project uses Vite for build tooling and shadcn/ui for components with a custom prohibition-era design system.

## Commands

### Development
- `npm run dev` - Start development server on port 8080
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Package Management
- `npm i` - Install dependencies
- Uses npm (not yarn/pnpm/bun)

## Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design system
- **Components**: shadcn/ui with Radix UI primitives
- **Routing**: React Router v6
- **State**: React Query for data fetching, React hooks for local state
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation

### Project Structure
```
src/
├── components/           # Main feature components
│   ├── Navigation.tsx   # Fixed header navigation
│   ├── Hero.tsx        # Landing section
│   ├── Events.tsx      # Regular events display
│   ├── TableBookings.tsx
│   ├── PrivateHire.tsx
│   ├── Artists.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── ui/             # shadcn/ui components
├── pages/              # Route pages
│   ├── Index.tsx       # Main landing page
│   └── NotFound.tsx    # 404 page
├── hooks/              # Custom React hooks
├── lib/                # Utilities (mainly utils.ts)
└── assets/             # Static assets
```

### Design System
- **Theme**: Prohibition-era with gold/champagne color scheme
- **Fonts**: Playfair Display (headings), Inter (body)
- **Components**: Uses shadcn/ui with custom styling
- **Colors**: Dark charcoal backgrounds with rich gold accents
- **CSS Variables**: Defined in `src/index.css` under `:root`

### Routing
- Single-page application with React Router
- Main content on Index page with anchor navigation
- 404 page for unmatched routes
- **Important**: Add custom routes ABOVE the catch-all "*" route in App.tsx

### Component Patterns
- Functional components with TypeScript
- Use shadcn/ui components with custom variants
- Import paths use `@/` alias (configured in tsconfig.json and Vite)
- Components follow naming convention: PascalCase.tsx
- Use Lucide React for icons

### Styling Guidelines
- Tailwind CSS with custom utilities in `src/index.css`
- Custom classes: `.art-deco-bg`, `.gradient-*`, `.shadow-luxury`, `.transition-luxury`
- Responsive design with mobile-first approach
- Fixed navigation with sections linked by anchors

## Venue Context

The website represents The Backroom Leeds, a hidden speakeasy at 50a Call Lane, Leeds. Key business details:
- 18+ venue with split-level design (upstairs/downstairs)
- Capacity: 500 full venue, 350 main area, 150 private room
- Regular events: La Fiesta (Friday), Shhh! (Saturday), Nostalgia (Sunday)
- Services: Table bookings, private hire, bottle service

### Assets Available
Rich media assets in `venue-assets/` including:
- Venue photos (empty and busy states)
- Event artwork for regular nights  
- Brand logos and fonts
- Marketing videos and PDFs
- Venue information in `backroom-leeds-venue-information.md`

## Configuration Files
- **Vite**: `vite.config.ts` - React SWC, path aliases, dev server on port 8080
- **Tailwind**: `tailwind.config.ts` - Custom color scheme, fonts, components
- **shadcn/ui**: `components.json` - Default style, TypeScript, CSS variables
- **TypeScript**: Strict settings disabled for rapid development

## Development Notes
- This is a Lovable.dev project with auto-deployment
- Uses `lovable-tagger` plugin in development mode
- TypeScript configured with relaxed settings (`noImplicitAny: false`)
- ESLint configured with React and TypeScript rules
- No test framework currently configured