import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  base: "/ex-prj/", // ✅ GitHub Pages용 base 경로
  build: {
    target: "es2015",
    outDir: "build", // ✅ gh-pages가 배포할 폴더 지정
  },
  server: {
    historyApiFallback: true,
  },
});
