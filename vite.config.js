import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    target: 'es2015', // es5+
  },
  // 정적 파일 서빙이라서 브라우저 새로고침 시 라우팅 꺠짐 방지
  server: {
    historyApiFallback: true,
  },
});
