// Packages
import $ from "jquery";

/**
 * Renders
 */

export const removeClearButtons = (): void => {
  $(".btn-clear").detach();
};

export const renderClearButton = (): void => {
  $(".chat__tools").append(
    `<button class="btn btn-outline-info btn-lg btn-clear" style="padding: 0px 4px 0px 4px; font-size: 1.2rem; color: grey;">Clear</button>`
  );
};

/**
 * Event Handlers
 */

export const createClearEventHandlers = (): void => {
  $("article.chat--full-screen").on("click", ".btn-clear", function () {
    $("trix-editor").text("");
  });
};
