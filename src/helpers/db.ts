import {
  BasecampEssentialsConfigStorage,
  BasecampEssentialsConfigParsed,
} from "../models/basecamp-essentials-config";

export const db = (): Promise<BasecampEssentialsConfigParsed> => {
  return new Promise((resolve) => {
    chrome.storage.sync.get("basecamp_essentials_config", (storage) => {
      const basecampEssentialsConfigStorage =
        storage as BasecampEssentialsConfigStorage;

      const parsedConfig =
        basecampEssentialsConfigStorage?.basecamp_essentials_config.reduce(
          (accumulator, currentValue) => {
            accumulator[currentValue.name] = currentValue.value;

            return accumulator;
          },
          {} as any
        );

      resolve(parsedConfig);
    });
  });
};
