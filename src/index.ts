import { basename, dirname, extname, format } from "node:path";
import { existsSync } from "node:fs";
import type { Plugin } from "rollup";
import type { CompilerOptions } from "typescript";
import { getResolvedPath, loadCompilerOptions } from "./utils";

type ResolveExtensionsOptions = {
  extensions: string[];
  compilerOptions?: CompilerOptions;
};

export const resolveExtensions = (
  options: ResolveExtensionsOptions,
): Plugin => {
  const finalCompilerOptions = {
    ...loadCompilerOptions(),
    ...(options?.compilerOptions ?? {}),
  };
  if (!options?.extensions || !options.extensions.length) {
    throw new Error(
      "The `extensions` option is required and must be an array of strings",
    );
  }
  return {
    name: "resolve-extensions",
    resolveId: {
      order: "pre",
      handler: (source, importer, { isEntry }) => {
        if (options.extensions.length && !isEntry && importer) {
          const resolvedPath = getResolvedPath(
            source,
            importer,
            finalCompilerOptions,
          );
          let updatedSource = "";

          if (resolvedPath) {
            const ext = extname(resolvedPath);
            const base = basename(resolvedPath, ext);
            const dir = dirname(resolvedPath);

            // check for extensions
            options.extensions.some((extension) => {
              const newPath = format({
                dir,
                name: base,
                ext: `${extension}${ext}`,
              });
              const exists = existsSync(newPath);
              if (exists) {
                updatedSource = newPath;
                return true;
              }
              return false;
            });

            return updatedSource || null;
          }
        }
        return null;
      },
    },
  };
};
