// Models
import {
  BasecampEssentialsConfigStorage,
  SerializedFormConfig,
} from "./models/basecamp-essentials-config";

document.addEventListener(
  "DOMContentLoaded",
  function () {
    chrome.storage.sync.get("basecamp_essentials_config", function (storage) {
      const basecampEssentialsConfigStorage =
        storage as BasecampEssentialsConfigStorage;

      if (!basecampEssentialsConfigStorage?.basecamp_essentials_config) {
        return;
      }

      basecampEssentialsConfigStorage.basecamp_essentials_config.forEach(
        (item) => {
          $(`#${item.name}`).val(item.value);
        }
      );
    });

    $(document).on("change", "form", function () {
      const formValues = $("form").serializeArray() as SerializedFormConfig;
      const storage: BasecampEssentialsConfigStorage = {
        basecamp_essentials_config: formValues,
      };

      chrome.storage.sync.set(storage);
    });
  },
  false
);
