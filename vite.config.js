import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
server: {
    hmr: {
        host: "localhost",
    },
    port: 3000,
    host: "0.0.0.0",
},
plugins: [
    vue(),
    laravel({
        input: ["resources/css/app.css", "resources/js/app.js"],
        refresh: true,
    }),
],
});
