document.addEventListener(
  "DOMContentLoaded",
  function () {
    chrome.storage.sync.get("basecamp_essentials_config", function (items) {
      console.log(items);

      if (!items.basecamp_essentials_config) {
        return;
      }

      items.basecamp_essentials_config.forEach((item) => {
        $(`#${item.name}`).val(item.value);
      });
    });

    $(document).on("change", "form", function () {
      const formValues = $("form").serializeArray();
      const storage = { basecamp_essentials_config: formValues };

      chrome.storage.sync.set(storage);
    });
  },
  false
);
