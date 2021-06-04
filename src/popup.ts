import { BasecampEssentialsConfigStorage } from "./models/basecamp-essentials-config";

document.addEventListener(
  "DOMContentLoaded",
  function () {
    chrome.storage.sync.get("basecamp_essentials_config", function (storage) {
      const basecampEssentialsConfigStorage =
        storage as BasecampEssentialsConfigStorage;
      console.log(basecampEssentialsConfigStorage);

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
      const formValues = $("form").serializeArray();
      const storage = { basecamp_essentials_config: formValues };

      chrome.storage.sync.set(storage);
    });
  },
  false
);
