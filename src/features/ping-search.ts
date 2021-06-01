// Packages
import $ from "jquery";

/**
 * Renders
 */

const addPingSearch = (): void => {
  $(".recordable.centered header").append(
    `<input type="text" id="ping-search" aria-describedby="basic-addon1">`
  );
};

export const renderPingSearch = (): void => {
  const domHasPingSearch = $("#ping-search").length;

  if (!domHasPingSearch) {
    addPingSearch();
  }
};

/**
 * Event Handlers
 */

export const createPingSearchEventHandlers = (): void => {
  $("#ping-search")
    .off()
    .on("change", function (event) {
      const value = $(event.currentTarget).val();

      $("a.circle-avatars").removeClass("ping-search-found");
      $("a.circle-avatars").show();

      $("article")
        .find(`a[aria-label*='${value}']`)
        .addClass("ping-search-found");
      $("a.circle-avatars:not(.ping-search-found)").hide();
    });
};
