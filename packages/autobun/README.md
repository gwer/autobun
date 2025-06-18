# Autobun

Back when web development was simple, applications were fast and straightforward. Autobun brings back that efficiency while leveraging modern tools and approaches.

Write code that just works. No overengineering, no unnecessary complexity. Just fast, reliable web applications built the right way.

Similar to early Next.js versions, but focused on simplicity, performance, and no magic. That's why the codebase is small and anyone can understand how it works.

---

Powered by [Bun](https://bun.sh), [Typescript](https://www.typescriptlang.org/) and [Preact](https://preactjs.com)

## Performance

Benchmarks on a minimal Hello World application:

### Build time

```
Next.js : ███████████████████████████████████████████████████...█ 17s
Autobun : █ 0.11s
```

### Dev start time

```
Next.js : ███████████ 1.1s
Autobun : █ Instant
```

### Bundle Size (HTML + JS, gzip)

```
Next.js : ████████████████ 133 KB
Autobun : █ 8.6 KB
```

### RPS

```
Next.js : █████ 4.5k
Autobun : ███████████████████████ 22.5k
```

### Dependencies install time

```
bun add next    : ██████████████████ 210s
bun add autobun : █ 12s
```

# Getting Started

## Install Bun

First, make sure you have the latest version of [Bun](https://bun.sh):

```bash
curl -fsSL https://bun.sh/install | bash
# or update existing installation
bun upgrade
```

## Initialize Project

If you don't have a project yet:

```bash
bun init # Choose "Blank" template
```

## Install Dependencies

```bash
bun add autobun preact preact-render-to-string
```

Autobun doesn't have its own Preact to let you choose your preferred version and avoid conflicts.

## Activate Preact

Add `"jsxImportSource": "preact"` to `tsconfig.json`.

## Create Pages

Add `_document.tsx` and `_app.tsx` files. See [examples/sample-app](./examples/sample-app) for reference.

Start creating pages in the `pages/` directory. Works similar to Next.js pages router.

## Examples

Check out `examples/` directory, especially `examples/sample-app` for reference implementations.

## Server-side Props

Unlike Next.js, `getServerSideProps` lives in separate files like `pages/page-name.props.ts` for clear separation between server and client code without any tricks. See [GET_SERVER_SIDE_PROPS.md](./docs/GET_SERVER_SIDE_PROPS.md) for details.

## Start development server

```bash
bun autobun dev
```

## Build

```bash
bun autobun build
```

## Start production server

```bash
bun autobun start
```

## FAQ

### Why Bun? Can I use Node.js instead?

No, you can't use Node.js. Bun is fast and comes with modern APIs out of the box that don't require pulling in tons of dependencies or writing a lot of boilerplate code.

### Why Preact instead of React?

Preact performs 10x faster, which reduces server load and/or allows for higher RPS. Also, React adds 100 KB to the bundle (gzipped), which increases the Hello World page size by 12x.

### Where's client-side routing? How do you live without SPA?

SPAs are overrated. Created to improve user experience, they've turned into huge unwieldy spaceships with bloated bundles. Modern SPAs often don't speed anything up, they just make life harder for both users and developers. Autobun's goal is to be a tool for building simple and efficient websites, so there's no client-side rendering out of the box.

### Why no React Server Components (RSC)?

RSC is an interesting idea that allows developers to pay less attention to architecture design. But Autobun is about efficiency and straightforwardness. You prepare data for a page, you send it to rendering. That's it. No magic, no complex abstractions, no blur between server and client boundaries. When you need server logic or data, you work with it on the server in one place. Clear separation leads to better performance and easier debugging.
