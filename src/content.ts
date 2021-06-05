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

// Helpers
import { getConfig } from "./helpers/db";

// Models
import { ParsedConfig } from "./models/basecamp-essentials-config";

const loop = (parsedConfig: ParsedConfig): void => {
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
  renderChatSummary(parsedConfig);

  createReplyEventHandlers();
  createClearEventHandlers();
  createIgnoreHeyEventHandlers();
  createPingSearchEventHandlers();

  setTimeout(() => {
    loop(parsedConfig);
  }, 2000);
};

const bootstrap = (): void => {
  getConfig().then((parsedConfig) => {
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

    loop(parsedConfig);
  });
};

/**
 * Init Extension
 */
$(function () {
  bootstrap();
});
