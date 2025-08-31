# monaiy - Setup Guide

This guide will help you set up the monaiy finance tracker project locally.

## Prerequisites

- Node.js 18+
- npm or pnpm
- Git

## Quick Start

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd monaiy
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run typecheck` - Run TypeScript compiler
- `npm run test` - Run all tests with coverage
- `npm run test:unit` - Run unit tests only
- `npm run test:watch` - Run tests in watch mode
- `npm run e2e` - Run Playwright E2E tests
- `npm run e2e:ui` - Run E2E tests with UI

## Project Structure

```
monaiy/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   ├── command/        # Command palette
│   │   ├── dashboard/      # Dashboard components
│   │   └── ui/            # UI primitives
│   ├── lib/               # Utility libraries
│   │   ├── db/            # Database (Dexie)
│   │   ├── pwa/           # PWA functionality
│   │   └── utils.ts       # Utility functions
│   ├── types/             # TypeScript types
│   └── test/              # Test setup
├── e2e/                   # Playwright E2E tests
├── public/                # Static assets
├── docs/                  # Documentation
└── specs/                 # Project specifications
```

## Key Features

### 🚀 PWA (Progressive Web App)

- Offline-first architecture
- Service Worker for caching
- Installable on mobile and desktop
- Background sync support

### 💾 Local Database

- IndexedDB via Dexie
- No backend required
- Data stays on your device
- Automatic migrations

### ⌨️ Keyboard-First UX

- Command palette (⌘K)
- Global keyboard shortcuts
- Fast interactions (<200ms)

### 🎨 Modern UI

- Tailwind CSS + shadcn/ui
- Dark mode support
- Responsive design
- Accessibility focused

## Development Workflow

### Pre-commit Hooks

The project uses Husky to run quality checks before each commit:

- ESLint (no warnings allowed)
- Prettier formatting
- Unit tests
- Type checking

### Testing Strategy

- **Unit Tests**: Vitest + Testing Library
- **E2E Tests**: Playwright
- **Coverage**: Minimum 80% required
- **Accessibility**: axe-core integration

### Code Quality

- TypeScript strict mode
- ESLint with Next.js rules
- Prettier for formatting
- Conventional commits

## Database Schema

The app uses IndexedDB with the following main entities:

- **Accounts**: Bank accounts and balances
- **Transactions**: Financial transactions with metadata
- **Categories**: Transaction categorization
- **Imports**: Import history and status
- **Budgets**: Spending limits and tracking

## PWA Features

### Service Worker

- Caches static assets
- Provides offline functionality
- Handles background sync
- Manages app updates

### Manifest

- App installation
- Splash screen
- App shortcuts
- Theme colors

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13.1+
- Edge 80+

## Troubleshooting

### Common Issues

1. **Service Worker not registering**
   - Check browser console for errors
   - Ensure HTTPS or localhost
   - Clear browser cache

2. **IndexedDB errors**
   - Check browser storage settings
   - Clear site data if needed
   - Verify Dexie version compatibility

3. **Build errors**
   - Clear node_modules and reinstall
   - Check Node.js version
   - Verify TypeScript configuration

### Getting Help

- Check the [docs/](./docs/) folder
- Review [specs/](./specs/) for requirements
- Open an issue for bugs
- Submit PRs for improvements

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Ensure all checks pass
6. Submit a pull request

## License

This project is licensed under the MIT License.
