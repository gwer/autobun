export type AutobunConfig = {
  isGzipStaticEnabled: boolean;
};

type ConfigDefaults = {
  readonly [K in keyof AutobunConfig]: AutobunConfig[K];
};

const CONFIG_DEFAULTS: ConfigDefaults = {
  isGzipStaticEnabled: false,
};

const ENV_KEYS = {
  GZIP_STATIC: 'AUTOBUN_GZIP_STATIC',
};

const parseBooleanEnv = (
  value: string | undefined,
  defaultValue: boolean
): boolean => {
  if (value === undefined) {
    return defaultValue;
  }

  const trueValues = ['true', '1', 't'];
  const normalized = value.toLowerCase().trim();

  return trueValues.includes(normalized);
};

const parseStringEnv = (
  value: string | undefined,
  defaultValue: string
): string => {
  return value?.trim() ?? defaultValue;
};

const loadConfig = (): AutobunConfig => {
  const isGzipStaticEnabled = parseBooleanEnv(
    Bun.env[ENV_KEYS.GZIP_STATIC],
    CONFIG_DEFAULTS.isGzipStaticEnabled
  );

  return {
    isGzipStaticEnabled,
  };
};

let cachedConfig: AutobunConfig | null = null;

export const getConfig = (): AutobunConfig => {
  if (cachedConfig === null) {
    cachedConfig = loadConfig();
  }

  return cachedConfig;
};
