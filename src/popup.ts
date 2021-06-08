// Models
import { ParsedConfig } from "./models/config";

// Helpers
import { getConfig, setConfig } from "./helpers/db";
import { ParseSerializedArrayForm } from "./helpers/form";

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
      const formValues = $("form").serializeArray();
      const parsedFormValues =
        ParseSerializedArrayForm<ParsedConfig>(formValues);

      setConfig(parsedFormValues);
    });
  },
  false
);
