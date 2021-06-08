// Packages
import $ from "jquery";

// Helpers
import { hasSubstring } from "../helpers/string";
import { ParseSerializedArrayForm } from "../helpers/form";

// Models
import { ParsedPingSearch } from "../models/ping-search";

/**
 * Renders
 */

const addPingSearch = (): void => {
  $(".recordable.centered header").append(
    `<form id="search-form" onsubmit="return false;">
        <input class="input" type="text" placeholder="Find someone..." name="pingSearch" id="pingSearch">
        <select class="input input--select" name="pingSearchPrecision" id="pingSearchPrecision">
          <option value="false">No Precision</option>
          <option value="true">Precision</option>
        </select>
      </form>
    `
  );
};

export const renderPingSearch = (): void => {
  const domHasPingSearch = $("#search-form").length;

  if (!domHasPingSearch) {
    addPingSearch();
  }
};

/**
 * Event Handlers
 */

export const createPingSearchEventHandlers = (): void => {
  $("#search-form")
    .off()
    .on("change", function (event) {
      const formValues = $(event.currentTarget).serializeArray();
      const parsedFormValues =
        ParseSerializedArrayForm<ParsedPingSearch>(formValues);

      $("a.circle-avatars").removeClass("ping-search-found");
      $("a.circle-avatars").show();

      if (parsedFormValues.pingSearch === "") {
        return;
      }

      $("article")
        .find(`a`)
        .filter((_, element) => {
          const text: string = $(element).attr("aria-label") || "";
          const keyWords =
            parsedFormValues.pingSearchPrecision === "true"
              ? [parsedFormValues.pingSearch]
              : parsedFormValues.pingSearch.split(" ");

          const hasSomeKeyWord = keyWords.some((keyWord) =>
            hasSubstring(
              text,
              keyWord,
              parsedFormValues.pingSearchPrecision === "true"
            )
          );

          return hasSomeKeyWord;
        })
        .addClass("ping-search-found");
      $("a.circle-avatars:not(.ping-search-found)").hide();
    });
};
