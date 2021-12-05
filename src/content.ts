// Packages
import $ from "jquery";

// Features
import {
  renderClearButton,
  renderReplyButtons,
  renderBoostAttributeLength,
  createClearEventHandlers,
  removeReplyButtons,
  createReplyEventHandlers,
  renderIgnoreHey,
  createIgnoreHeyEventHandlers,
  renderArticleAsAlert,
  renderPingSearch,
  createPingSearchEventHandlers,
  renderChatSummary,
  renderAdditionalEmojis,
  renderTodoContent,
  createTodoContentEventHandlers,
} from "./features";

// Helpers
import { getConfig } from "./helpers/db";

// Models
import { ParsedConfig } from "./models/config";

const loop = (parsedConfig: ParsedConfig): void => {
  const pageHasChatContent =
    window.location.pathname.includes("circles") ||
    window.location.pathname.includes("chats");
  const isTodoPage = window.location.pathname.includes("todos/");

  removeReplyButtons();

  if (pageHasChatContent) {
    renderReplyButtons();
    renderClearButton();
    renderArticleAsAlert(parsedConfig);
  }

  if (isTodoPage) {
    renderTodoContent();
    createTodoContentEventHandlers();
  }

  renderAdditionalEmojis();
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
      renderArticleAsAlert(parsedConfig);
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
