import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

import { useAlias } from './buildConfig/useAlias'
import { useEnvConfig } from './buildConfig/useEnvConfig'

const envConfig = useEnvConfig()

export default defineConfig({
  base: envConfig.BASE,
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
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
