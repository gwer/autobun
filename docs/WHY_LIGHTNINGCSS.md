# Why lightningcss instead of esbuild's built-in CSS handling?

While esbuild provides built-in CSS processing capabilities, I chose lightningcss for one critical reason:

## Consistent Class Name Generation

The main issue with esbuild's built-in CSS modules loader is its lack of support for consistent class name generation across different builds. This is particularly problematic when:

- Building both client and server bundles
- The same CSS modules need to be processed multiple times
- Hydration is involved

Unlike webpack's `localIdentName` option, esbuild doesn't provide a way to control the generated class names. This leads to mismatched class names between server-side rendered content and client-side hydration, causing hydration errors and styling inconsistencies.

lightningcss solves this by providing consistent class name generation across multiple builds, similar to webpack's behavior.

I will continue using lightningcss until esbuild implements similar class name generation control features.
