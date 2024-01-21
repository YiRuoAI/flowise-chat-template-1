import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'

import { useAlias } from './buildConfig/useAlias'
import { useEnvConfig } from './buildConfig/useEnvConfig'

const envConfig = useEnvConfig()

export default defineConfig({
  base: envConfig.BASE,
  plugins: [
    vue(),
  ],
  css: {
    postcss: {
      plugins: [
        {
          postcssPlugin: 'internal:charset-removal',
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === 'charset') {
                atRule.remove()
              }
            },
          },
        },
      ],
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `
              @import "${resolve(__dirname, 'src/styles/less/g-reset.less')}";
              @import "${resolve(__dirname, 'src/styles/less/g-mixin.less')}";
              @import "${resolve(__dirname, 'src/styles/less/g-animation.less')}";
              @import "${resolve(__dirname, 'src/styles/less/g-variable.less')}";`,
      },
    },
  },
  resolve: {
    alias: useAlias(),
  },
})
