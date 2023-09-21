import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [svgr(), react()],
  resolve: {
    alias: [
      { find: "@styles", replacement: "/src/styles" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@views", replacement: "/src/views" },
      { find: "@components", replacement: "/src/components" },
      { find: "@types", replacement: "/src/types" },
      { find: "@stores", replacement: "/src/stores" },
      { find: "@utils", replacement: "/src/utils" },
      { find: "@lotties", replacement: "/src/assets/lotties" },
      { find: "@svg", replacement: "/src/assets/svg" },
      { find: "@images", replacement: "/src/assets/images" },
      { find: "@hooks", replacement: "/src/hooks" },
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
});
