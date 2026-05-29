import { defineConfig }
from 'vite'

import react
from '@vitejs/plugin-react'

import {
  VitePWA
}
from 'vite-plugin-pwa'

export default defineConfig({

  plugins: [

    react(),

    VitePWA({

      includeAssets: [
  'favicon.png',
  'icon-192.png',
  'icon-512.png'
],

      registerType:
        'autoUpdate',

      manifest: {

        name: 'ZEIT',

        short_name: 'ZEIT',

        description:
          'Realtime dollar intelligence',

        theme_color:
          '#020617',

        background_color:
          '#020617',

        display:
          'standalone',

        orientation:
          'portrait',

        icons: [

          {

            src:
              '/icon-192.png',

            sizes:
              '192x192',

            type:
              'image/png'
          },

          {

            src:
              '/icon-512.png',

            sizes:
              '512x512',

            type:
              'image/png'
          }
        ]
      }
    })
  ]
})