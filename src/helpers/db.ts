// Packages
import {
  ConfigStorage,
  ParsedConfig,
} from "../models/basecamp-essentials-config";

// Helpers
import { compareKeys } from "./form";

const configEntityName = "config";
const defaultParsedConfig: ParsedConfig = {
  chatSummary: "false",
  coloredChatBorder: "false",
};

export const getConfig = (): Promise<ParsedConfig> => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(configEntityName, (storage) => {
      const configStorage = storage as ConfigStorage;

      if (
        !configStorage?.config ||
        !compareKeys(configStorage?.config, defaultParsedConfig)
      ) {
        const newConfig: ParsedConfig = {
          ...defaultParsedConfig,
          ...configStorage.config,
        };
        setConfig(newConfig).then(() => {
          resolve(newConfig);
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
