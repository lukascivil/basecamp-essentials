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
  renderChatSummary,
} from "./features";

const loop = (): void => {
  const pageHasChatContent =
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
  renderChatSummary();

  createReplyEventHandlers();
  createClearEventHandlers();
  createIgnoreHeyEventHandlers();
  createPingSearchEventHandlers();

  setTimeout(() => {
    loop();
  }, 2000);
};

const bootstrap = (): void => {
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

  loop();
};

/**
 * Init Extension
 */
$(function () {
  bootstrap();
});
