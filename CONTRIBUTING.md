# Contributing to Reveal React Deck

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Prerequisites

- Node.js 20 or higher
- pnpm 10.9.0 (specified in `packageManager` field)

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/reveal-react-deck.git
   cd reveal-react-deck
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```

## Development Workflow

### Building Packages

```bash
# Build all packages
pnpm build

# Build specific package
pnpm --filter reveal-react-deck build
pnpm --filter create-deck build
```

### Type Checking

```bash
# Check types for all packages
pnpm types:check

# Check specific package
pnpm --filter reveal-react-deck types:check
pnpm --filter create-deck types:check
```

### Linting

```bash
# Lint all packages
pnpm lint

# Lint specific package
pnpm --filter reveal-react-deck lint
pnpm --filter create-deck lint
```

### Running the Example

```bash
# Start the example deck
pnpm dev:example

# Or directly
pnpm --filter examples/basic-deck dev
```

### Cleaning Build Artifacts

```bash
# Clean all packages
pnpm clean

# Clean specific package
pnpm --filter reveal-react-deck clean
```

## Project Structure

```
reveal-react-deck/
├── .changeset/           # Changesets for versioning
├── examples/
│   └── basic-deck/       # Example presentation
├── packages/
│   ├── create-deck/      # CLI for scaffolding new decks
│   │   ├── src/          # CLI source code
│   │   └── template/     # Template for new projects
│   └── reveal-react-deck/ # Main library
│       ├── src/          # Library source code
│       ├── css/          # CSS presets and themes
│       └── dist/         # Built files (ignored in git)
└── package.json          # Root workspace configuration
```

## Making Changes

### Code Style

- We use Prettier for code formatting (see `.prettierrc`)
- We use ESLint for linting (see `eslint.config.js` in each package)
- TypeScript strict mode is encouraged for new code

### Commit Messages

Write clear and descriptive commit messages:

```
Add feature X to component Y

- Detailed explanation of what changed
- Why the change was necessary
- Any breaking changes
```

### Pull Requests

1. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/my-new-feature
   ```
2. Make your changes
3. Run type checking and linting:
   ```bash
   pnpm types:check
   pnpm lint
   pnpm build
   ```
4. Commit your changes
5. Push to your fork and create a Pull Request

### Testing Your Changes

Before submitting:

1. Build all packages: `pnpm build`
2. Run the example deck: `pnpm dev:example`
3. Test the CLI: `pnpm --filter create-deck build && pnpm --filter create-deck exec create-deck`

## Package-Specific Guidelines

### reveal-react-deck

- Add new components to `src/components/`
- Add new hooks to `src/hooks/`
- Add new MDX plugins to `src/plugins/`
- Export public APIs from appropriate index files
- Update CSS files in `css/` for styling changes

### create-deck

- Template changes go in `template/`
- CLI logic goes in `src/index.ts`
- Test the CLI by building and running it locally

## Versioning

This project uses [Changesets](https://github.com/changesets/changesets) for versioning:

1. After making changes, run:
   ```bash
   pnpm changeset
   ```
2. Follow the prompts to describe your changes
3. Commit the generated changeset file with your PR

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person

## Questions?

If you have questions, feel free to:
- Open an issue for discussion
- Check existing issues and discussions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
