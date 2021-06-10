// Packages
import $ from "jquery";

/**
 * Renders
 */

export const renderButton = (): void => {
  const hasClearButton = $(".btn-clear").length;

  if (hasClearButton) {
    return;
  }

  $(".chat__mic.input").attr({
    style: "padding: 1rem 11rem 1rem 1rem !important;",
  });
  $(".chat__tools").append(
    `<button class="btn btn-outline-info btn-lg btn-clear" style="padding: 0px 4px 0px 4px; font-size: 1.2rem; color: grey;">Clear</button>`
  );
};

export const renderClearButton = (): void => {
  renderButton();
};

/**
 * Event Handlers
 */

export const createClearEventHandlers = (): void => {
  $("article.chat--full-screen")
    .off()
    .on("click", ".btn-clear", function () {
      $("trix-editor").text("");
    });
};
