// Packages
import $ from "jquery";

// Features
import {
  renderClearButton,
  renderReplyButtons,
  renderBoostAttributeLength,
  createClearEventHandlers,
  removeReplyButtons,
  removeClearButtons,
  createReplyEventHandlers,
  renderIgnoreHey,
  createIgnoreHeyEventHandlers,
  removeIgnoreHey,
  renderArticleAsAlert,
  renderPingSearch,
  createPingSearchEventHandlers,
} from "./features";

$(function () {
  let pageHasChatContent: boolean =
    window.location.pathname.includes("circles") ||
    window.location.pathname.includes("chats");

  if (pageHasChatContent) {
    renderReplyButtons();
    renderArticleAsAlert();
    renderClearButton();
  }

  renderBoostAttributeLength();
  renderPingSearch();

  createIgnoreHeyEventHandlers();
  createClearEventHandlers();
  createReplyEventHandlers();

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
      renderArticleAsAlert();
    }

    renderPingSearch();
    renderBoostAttributeLength();
    renderIgnoreHey();

    createReplyEventHandlers();
    createClearEventHandlers();
    createIgnoreHeyEventHandlers();
    createPingSearchEventHandlers();

    setTimeout(() => {
      bootstrap();
    }, 2000);
  };

  bootstrap();
});
