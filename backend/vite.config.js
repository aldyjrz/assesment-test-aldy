import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
            fonts: [
                bunny('Instrument Sans', {
                    weights: [400, 500, 600],
                }),
            ],
        }),
        tailwindcss(),
    ],
    server: {
        //ini agar bisa di akses
          host: "0.0.0.0",
            proxy: {
            "/api": {
                target: "http://backend:8000", //  Docker Compose
                changeOrigin: true,
            },
            },
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
