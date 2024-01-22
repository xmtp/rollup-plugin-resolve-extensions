import { readFileSync } from "node:fs";
import type { CompilerOptions } from "typescript";
import ts from "typescript";
import { findUpSync } from "find-up";

const {
  ModuleResolutionKind,
  bundlerModuleNameResolver,
  nodeModuleNameResolver,
  readConfigFile,
  sys,
} = ts;

type TSConfig = {
  compilerOptions?: CompilerOptions;
};

const loadTSConfig = (tsConfigPath: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { config, error } = readConfigFile(tsConfigPath, (path) =>
    readFileSync(path, "utf8"),
  );
  if (error) {
    throw new Error(`Unable to load "${tsConfigPath}"`);
  }
  return (config ?? {}) as TSConfig;
};

export const loadCompilerOptions = () => {
  let config: TSConfig = {};
  const configPath = findUpSync("tsconfig.json");
  if (configPath) {
    config = loadTSConfig(configPath);
  }
  return config?.compilerOptions ?? {};
};

export const getResolvedPath = (
  path: string,
  importer: string,
  compilerOptions: CompilerOptions,
) => {
  const moduleResolver =
    compilerOptions?.moduleResolution === ModuleResolutionKind.Bundler
      ? bundlerModuleNameResolver
      : nodeModuleNameResolver;
  const { resolvedModule } = moduleResolver(
    path,
    importer,
    compilerOptions,
    sys,
  );

  const resolvedFileName = resolvedModule?.resolvedFileName;
  if (!resolvedFileName || resolvedFileName.endsWith(".d.ts")) {
    return null;
  }

  return sys.resolvePath(resolvedFileName);
};
