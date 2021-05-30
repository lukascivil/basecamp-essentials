import $ from "jquery";
import {
  renderClearButton,
  renderReplyButtons,
  renderBoostAttributeLength,
  createClearEventHandlers,
  removeReplyButtons,
  removeClearButtons,
  createEventHandlers,
  removeEventHandlers,
  renderIgnoreHey,
  createIgnoreHeyEventHandlers,
  removeIgnoreHey,
} from "./features";

$(function () {
  let pageHasChatContent: boolean =
    window.location.pathname.includes("circles") ||
    window.location.pathname.includes("chats");

  if (pageHasChatContent) {
    renderReplyButtons();
    renderClearButton();
  }
  renderBoostAttributeLength();

  createIgnoreHeyEventHandlers();
  createClearEventHandlers();
  createEventHandlers();

  const bootstrap = (): void => {
    pageHasChatContent =
      window.location.pathname.includes("circles") ||
      window.location.pathname.includes("chats");

    removeClearButtons();
    removeIgnoreHey();
    removeReplyButtons();

    if (pageHasChatContent) {
      renderReplyButtons();
      renderClearButton();
    }
    renderBoostAttributeLength();
    renderIgnoreHey();

    removeEventHandlers();
    createEventHandlers();
    createClearEventHandlers();
    createIgnoreHeyEventHandlers();

    setTimeout(() => {
      bootstrap();
    }, 2000);
  };

  bootstrap();
});
