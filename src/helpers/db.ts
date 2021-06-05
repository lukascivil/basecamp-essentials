// Packages
import {
  ConfigStorage,
  ParsedConfig,
} from "../models/basecamp-essentials-config";

const configEntityName = "config";
const defaultParsedConfig: ParsedConfig = { chatSummary: "false" };

export const getConfig = (): Promise<ParsedConfig> => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(configEntityName, (storage) => {
      const configStorage = storage as ConfigStorage;

      if (!configStorage?.config) {
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
  const configStorage: ConfigStorage = { [configEntityName]: parsedConfig };

  return new Promise((resolve) => {
    chrome.storage.sync.set(configStorage, () => {
      resolve();
    });
  });
};
