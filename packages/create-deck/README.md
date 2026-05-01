# create-deck

A CLI tool that scaffolds a Reveal.js + React deck using the `reveal-react-deck` library, Tailwind CSS v4, and MDX-based slides.

## Usage

Create a new presentation deck:

```bash
npx create-deck
# or
pnpm create create-deck
# or
yarn create deck
```

The CLI will:

1. Prompt you for a project name
2. Copy the template into a new directory
3. Update the `package.json` with your project name
4. Install dependencies automatically

## What You Get

The scaffolded project includes:

- **Vite + React + TypeScript** - Modern development setup
- **Tailwind CSS v4** - Latest version with modern CSS features
- **MDX slides** - Author presentations in MDX format
- **reveal-react-deck library** - Pre-configured with components and layouts
- **Example slides** - Sample presentation to get started
- **Reveal.js configuration** - Customizable presentation options
- **Branding assets** - Placeholder assets in `public/` folder

## Project Structure

```
your-project/
├── public/           # Static assets
├── slides/           # MDX slide files
│   ├── 00-intro.mdx
│   └── ...
├── src/
│   ├── main.tsx      # Application entry point
│   ├── App.tsx       # Main App component
│   └── reveal.config.tsx  # Reveal.js options
├── package.json
├── vite.config.ts
└── tailwind.config.ts
```

## Development

After scaffolding, navigate to your project and run:

```bash
cd your-project
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm preview    # Preview production build
```

## Requirements

- Node.js 20 or higher
- pnpm (recommended), npm, or yarn

## Documentation

For detailed documentation about the `reveal-react-deck` library and slide authoring, see the [main repository](https://github.com/zrlf/reveal-react-deck).

## License

MIT
