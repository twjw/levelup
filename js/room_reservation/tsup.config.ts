import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/main.ts'],
  outDir: 'dist',
  splitting: false,
  sourcemap: true,
  clean: true,
  bundle: true,
  minify: true,
  format: 'esm',
  target: 'node16',
  platform: 'node'
})
