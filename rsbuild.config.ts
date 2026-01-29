import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginSvgr } from '@rsbuild/plugin-svgr'
import { pluginTypeCheck } from '@rsbuild/plugin-type-check'

export default defineConfig({
  dev: {
    lazyCompilation: true,
  },
  html: {
    template: 'public/index.html',
  },
  source: {
    transformImport: [
      {
        libraryName: '@mui/icons-material',
        customName: '@mui/icons-material/{{ member }}',
      },
      {
        libraryName: 'lodash',
        customName: 'lodash/{{ member }}',
      },
    ],
  },
  output: {
    polyfill: 'usage',
    cleanDistPath: true,
    legalComments: 'none',
    assetPrefix: 'shiftCalendar',
  },
  plugins: [
    pluginReact(),
    pluginSvgr({ svgrOptions: { ref: true } }),
    pluginTypeCheck(),
  ],
  server: {
    port: 3000,
    strictPort: true,
  },
})
