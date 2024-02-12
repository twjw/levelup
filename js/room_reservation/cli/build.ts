import esbuild from 'esbuild'
import * as fs from "fs";
import glob from "tiny-glob";
import esbuildPluginPino from "esbuild-plugin-pino";

try {
  await fs.promises.access('dist')
  await fs.promises.rm('dist', { recursive: true })
} catch {}
finally {
  await fs.promises.mkdir('dist')
}

const entryPoints = await glob('src/**/*.ts')
esbuild.build({
  entryPoints,
  logLevel: 'info',
  platform: 'node',
  target: 'node16',
  format: 'cjs',
  outdir: 'dist',
  sourcemap: true,
  bundle: true,
  minify: true,
  plugins: [
    esbuildPluginPino({ transports: ['pino-pretty'] }),
  ],
}).catch((e) => console.error(e))
