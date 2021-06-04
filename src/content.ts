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
import { db } from "./helpers/db";

// Models
import { BasecampEssentialsConfigParsed } from "./models/basecamp-essentials-config";

const loop = (
  basecampEssentialsConfigParsed: BasecampEssentialsConfigParsed
): void => {
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
  renderChatSummary(basecampEssentialsConfigParsed);

  createReplyEventHandlers();
  createClearEventHandlers();
  createIgnoreHeyEventHandlers();
  createPingSearchEventHandlers();

  setTimeout(() => {
    loop(basecampEssentialsConfigParsed);
  }, 2000);
};

const bootstrap = (): void => {
  db().then((basecampEssentialsConfigParsed) => {
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

    loop(basecampEssentialsConfigParsed);
  });
};

/**
 * Init Extension
 */
$(function () {
  bootstrap();
});
