# create-autobun-app

The fastest way to create a new [Autobun](https://github.com/gwer/autobun) application.

## Usage

```bash
bun create autobun-app my-app
```

## What's included

The generated project includes:

- ⚡ **Bun runtime** - Fast JavaScript runtime with built-in bundler
- ⚛️ **Preact** - Fast and lightweight alternative to React
- 🎯 **TypeScript** - Type safety out of the box
- 📁 **File-based routing** - Similar to Next.js Pages Router
- 🏗️ **Zero config** - No complex configuration needed
- 🚀 **Fast builds** - Lightning-fast development and production builds

## Getting Started

After creating your app:

```bash
cd my-app
bun install
bun run dev
```

Your app will be available at `http://localhost:3000`

## Project Structure

```
my-app/
├── pages/
│   ├── _app.tsx      # Custom App component
│   ├── _document.tsx # Custom Document component
│   └── index.tsx     # Home page
├── types/
│   └── global.d.ts   # Global type definitions
├── package.json
├── tsconfig.json
└── README.md
```

## Learn More

- [Autobun Documentation](https://github.com/gwer/autobun)
- [Bun Documentation](https://bun.sh/docs)
- [Preact Documentation](https://preactjs.com/)
