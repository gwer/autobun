# Manual Project Setup

If you prefer to set up your Autobun project manually instead of using the scaffolding tool, follow these steps:

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

Add `_document.tsx` and `_app.tsx` files. See [examples/sample-app](../examples/sample-app) for reference.

Start creating pages in the `pages/` directory. Works similar to Next.js pages router.

## Development and Production

### Start development server

```bash
bun autobun dev
```

### Build

```bash
bun autobun build
```

### Start production server

```bash
bun autobun start
```

## Next Steps

Check out `examples/` directory, especially `examples/sample-app` for reference implementations.

For server-side props, see [GET_SERVER_SIDE_PROPS.md](./GET_SERVER_SIDE_PROPS.md) for details.
