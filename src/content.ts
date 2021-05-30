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

  createClearEventHandlers();
  createEventHandlers();

  setInterval(() => {
    pageHasChatContent =
      window.location.pathname.includes("circles") ||
      window.location.pathname.includes("chats");

    removeClearButtons();
    removeReplyButtons();

    if (pageHasChatContent) {
      renderReplyButtons();
      renderClearButton();
    }
    renderBoostAttributeLength();

    removeEventHandlers();
    createEventHandlers();
    createClearEventHandlers();
  }, 3000);
});
