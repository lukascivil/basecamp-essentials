// Models
import { SerializedArrayFormConfig } from "./models/basecamp-essentials-config";

// Helpers
import { getConfig, setConfig } from "./helpers/db";
import { ParseSerializedArrayFormConfig } from "./helpers/form";

document.addEventListener(
  "DOMContentLoaded",
  function () {
    getConfig().then((parsedConfig) => {
      if (!parsedConfig) {
        return;
      }

      Object.entries(parsedConfig).forEach(([key, value]) => {
        $(`#${key}`).val(value);
      });
    });

    $(document).on("change", "form", function () {
      const formValues = $(
        "form"
      ).serializeArray() as SerializedArrayFormConfig;
      const parsedFormValues = ParseSerializedArrayFormConfig(formValues);

      setConfig(parsedFormValues);
    });
  },
  false
);
