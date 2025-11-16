# DigiDart Assignment - Client

A modern React application built with TypeScript, Vite, and TanStack Router.

## 🔗 Live Links

- **Frontend**: [https://flowai-chi.vercel.app/](https://flowai-chi.vercel.app/)
- **Backend**: [https://api-server-sandy-six.vercel.app/](https://api-server-sandy-six.vercel.app/)

## 📂 GitHub Repositories

- **Frontend Repository**: [https://github.com/itschirag-me/dd-assignment-client](https://github.com/itschirag-me/dd-assignment-client)
- **Backend Repository**: [https://github.com/itschirag-me/dd-assignment-server](https://github.com/itschirag-me/dd-assignment-server)

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TanStack Router** - Type-safe routing
- **TanStack Query** - Data fetching and state management
- **Tailwind CSS** - Styling
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Axios** - HTTP client
- **Radix UI** - Accessible component primitives

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **pnpm** (package manager)

### Installing pnpm

If you don't have pnpm installed, you can install it globally using npm:

```bash
npm install -g pnpm
```

Or using Homebrew (macOS):

```bash
brew install pnpm
```

## Setup Instructions

1. **Clone the repository** (if not already done):
   ```bash
   git clone https://github.com/itschirag-me/dd-assignment-client.git
   cd dd-assignment-client
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Set up environment variables**:
   
   Create a `.env` file in the root directory:
   ```bash
   touch .env
   ```
   
   Add the following environment variable:
   ```env
   VITE_API_URL=https://api-server-sandy-six.vercel.app
   ```
   
   For local development, you can use:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

## Running the Application

### Development Mode

Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173` (or the next available port).

The dev server includes:
- Hot Module Replacement (HMR)
- Fast refresh for React components
- TypeScript type checking

### Build for Production

Build the application for production:

```bash
pnpm build
```

The production build will be created in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```bash
pnpm preview
```

### Linting

Run ESLint to check for code quality issues:

```bash
pnpm lint
```

## Project Structure

```
client/
├── public/          # Static assets
├── src/
│   ├── assets/      # Images, animations, etc.
│   ├── components/  # Reusable React components
│   │   └── ui/      # UI component library
│   ├── config/      # Configuration files (API instance, etc.)
│   ├── hooks/       # Custom React hooks
│   ├── lib/         # Utility functions and helpers
│   ├── routes/      # Route components (TanStack Router)
│   └── main.tsx     # Application entry point
├── .env             # Environment variables (create this)
├── package.json     # Dependencies and scripts
└── vite.config.ts   # Vite configuration
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Base URL for the API backend | Yes |

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically use the next available port. You can also specify a custom port:

```bash
pnpm dev -- --port 3000
```

### Dependency Issues

If you encounter dependency issues, try:

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### TypeScript Errors

Ensure TypeScript is properly configured. The project uses:
- `tsconfig.json` - Base TypeScript configuration
- `tsconfig.app.json` - Application-specific configuration
- `tsconfig.node.json` - Node.js-specific configuration

## Additional Resources

- [Vite Documentation](https://vite.dev/)
- [TanStack Router Documentation](https://tanstack.com/router)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
