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
bun init
```

## Install Dependencies

```bash
bun add autobun preact preact-render-to-string
```

> Autobun doesn't have its own preact Preact to let you choose your preferred version and avoid conflicts.

## Create Pages

Start creating pages in the `pages/` directory. Works similar to Next.js.

## Examples

Check out `examples/` directory, especially `examples/sample-app` for reference implementations.

## Server-side Props

Unlike Next.js, `getServerSideProps` lives in separate files like `pages/page-name.props.ts` for clear separation between server and client code without any tricks. See [GET_SERVER_SIDE_PROPS.md](./docs/GET_SERVER_SIDE_PROPS.md) for details.
