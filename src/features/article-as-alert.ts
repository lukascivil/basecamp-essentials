// Packages
import $ from "jquery";

/**
 * Renders
 */

const renderQuestionsArticleAlert = (): void => {
  $('.chat-line__body:contains("?")').closest(".chat-line__bubble").attr({
    style: "background: #f59a6b;",
  });
};

const renderGitHubMergedArticleAlert = (): void => {
  $('.chat-line__body:contains("merged pull request")')
    .closest(".chat-line__bubble")
    .attr({
      style: "background: #bca4e6;",
    });
};

const renderGitHubReadyForReviewArticleAlert = (): void => {
  $('.chat-line__body:contains("/pull/")').closest(".chat-line__bubble").attr({
    style: "background: #7ed182",
  });
};

const renderGitHubOpennedPullRequestArticleAlert = (): void => {
  $('.chat-line__body:contains("opened pull request")')
    .closest(".chat-line__bubble")
    .attr({
      style: "background: #b0b0b0",
    });
};

export const renderArticleAsAlert = (): void => {
  renderQuestionsArticleAlert();
  renderGitHubMergedArticleAlert();
  renderGitHubReadyForReviewArticleAlert();
  renderGitHubOpennedPullRequestArticleAlert();
};
