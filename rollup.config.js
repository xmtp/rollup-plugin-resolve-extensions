import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";
import filesize from "rollup-plugin-filesize";

const plugins = [
  typescript({
    declaration: false,
    declarationMap: false,
  }),
  filesize({
    showMinifiedSize: false,
  }),
];

const external = [
  "find-up",
  "node:fs",
  "node:path",
  "strip-json-comments",
  "typescript",
];

export default defineConfig([
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.js",
      format: "es",
      generatedCode: "es2015",
      sourcemap: true,
    },
    plugins,
    external,
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.cjs",
      format: "cjs",
      generatedCode: "es2015",
      sourcemap: true,
    },
    plugins,
    external,
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.d.ts",
      format: "es",
      generatedCode: "es2015",
    },
    plugins: [dts()],
  },
]);
