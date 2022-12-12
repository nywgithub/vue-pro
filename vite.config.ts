import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {
        outDir: "build",
        assetsDir: "assets",
        manifest: false,
        rollupOptions: {
            output: {
                entryFileNames: `assets/index.js`,
                chunkFileNames: `assets/index.js`,
                assetFileNames: `assets/index.[ext]`,
            },
        },
    },
})
