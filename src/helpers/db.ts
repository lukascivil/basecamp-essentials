// Packages
import {
  ConfigStorage,
  ParsedConfig,
} from "../models/basecamp-essentials-config";

const defaultParsedConfig: ParsedConfig = { chatSummary: "false" };

export const getConfig = (): Promise<ParsedConfig> => {
  return new Promise((resolve) => {
    chrome.storage.sync.get("config", (storage) => {
      const configStorage = storage as ConfigStorage | undefined;

      if (!configStorage) {
        setConfig(defaultParsedConfig).then(() => {
          resolve(defaultParsedConfig);
        });

        return;
      }

      resolve(configStorage.config);
    });
  });
};

export const setConfig = (parsedConfig: ParsedConfig): Promise<void> => {
  const configStorage: ConfigStorage = { config: parsedConfig };

  return new Promise((resolve) => {
    chrome.storage.sync.set(configStorage, () => {
      resolve();
    });
  });
};
