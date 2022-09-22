import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePluginImp from "vite-plugin-imp";
import fs from 'fs/promises';

const { resolve } = require("path"); //必须要引入resolve

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.vue'],
    alias: {
      "@components": resolve(__dirname, "src", "components"),
      "@utils": resolve(__dirname, "src", "utils"),
      "@config": resolve(__dirname, "src", "config"),
      "@": resolve("src"),
      "components": resolve("src/components"),
      "pages": resolve("src/pages")
    },
  },
  server: {
    host: true,
  },
  plugins: [
    react(),
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style: (name) => `antd/lib/${name}/style/index.less`,
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: '@root-entry-name: default;',
      },
    },
  },
});
