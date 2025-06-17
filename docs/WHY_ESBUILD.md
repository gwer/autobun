# Why esbuild instead of Bun.build?

While Bun provides its own bundler (`Bun.build`), I chose to use esbuild for these technical reasons:

1. **Multiple Entry Points**

   - Supports multiple entry points with individual output configurations
   - Required for building entry points outside project root

2. **CSS Modules Support**

   - Native CSS Modules support
   - `Bun.build` currently lacks this feature

3. **Watch Mode**
   - Better file watching capabilities
   - More reliable handling of file changes during development

I plan to re-evaluate `Bun.build` once it implements these critical features.
