# Configuration

Autobun is configured using environment variables. Bun automatically reads `.env` files and provides multiple ways to set environment variables. For more details about how Bun handles environment variables, see the [official Bun documentation](https://bun.sh/docs/runtime/env).

## Environment Variables

### AUTOBUN_GZIP_STATIC

Controls whether static assets are served with gzip compression.

- **Type:** `boolean`
- **Default:** `false`
- **Values:** `true`, `false`, `1`, `0`

When enabled, static assets (CSS, JS, images, etc.) will be compressed using gzip before being served to the client.

**Example:**

```bash
AUTOBUN_GZIP_STATIC=true bun autobun start
```

## Setting Environment Variables

### Using .env files

Create a `.env` file in your project root:

```env
AUTOBUN_GZIP_STATIC=true
```

### Using command line

```bash
AUTOBUN_GZIP_STATIC=true bun autobun start
```

### Different environments

You can create environment-specific configuration files (depending on value of `NODE_ENV`):

- `.env.development` - for development
- `.env.production` - for production
- `.env.test` - for testing
