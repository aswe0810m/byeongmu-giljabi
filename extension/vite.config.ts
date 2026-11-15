import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';

// 콘텐츠 스크립트는 ES 모듈로 실행되지 않으므로 IIFE 단일 파일(content.js)로 묶는다.
export default defineConfig({
  publicDir: false,
  esbuild: { jsx: 'automatic' },
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'chrome110',
    cssCodeSplit: false,
    lib: {
      entry: 'src/content/main.tsx',
      formats: ['iife'],
      name: 'bmgj',
      fileName: () => 'content.js',
    },
  },
  plugins: [
    {
      name: 'bmgj-copy-manifest',
      generateBundle() {
        this.emitFile({
          type: 'asset',
          fileName: 'manifest.json',
          source: readFileSync('manifest.json', 'utf8'),
        });
        // 병무민원 화면용 글꼴(병무청 누리집과 같은 Pretendard GOV Medium subset, OFL-1.1)
        for (const name of ['PretendardGOV-Medium.subset.woff2', 'LICENSE.txt']) {
          this.emitFile({ type: 'asset', fileName: `fonts/${name}`, source: readFileSync(`assets/fonts/${name}`) });
        }
      },
    },
  ],
});
