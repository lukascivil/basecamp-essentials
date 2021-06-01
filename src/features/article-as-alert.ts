// Packages
import $ from "jquery";

/**
 * Renders
 */

const renderArticleQuestionsAlert = (): void => {
  $('.chat-line__body:contains("?")').closest(".chat-line__bubble").attr({
    style: "background: #f59a6b;",
  });
};

export const renderArticleAsAlert = (): void => {
  renderArticleQuestionsAlert();
};
