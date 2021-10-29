// Packages
import $ from "jquery";

// Helpers
import { tryBuildReplyBodyMessageFromLineBodyNodes } from "../helpers/reply-messages";

// Utils
import { computeFriendlyDifferenceFromNow } from "../utils/time";

/**
 * Renders
 */
export const removeReplyButtons = (): void => {
  $(".btn-reply, .btn-reply-all").detach();
};

export const renderReplyButtons = (): void => {
  $("article")
    .not(".chat-line--me")
    .append(
      `<button class="btn btn-outline-info btn-lg btn-reply" style="padding: 0px 4px 0px 4px; font-size: 1.2rem; color: grey;">Reply</button>`
    );

  $("article")
    .not(".chat-line--thread")
    .not(".chat-line--me")
    .filter((_, element) => {
      const hasNextPost = $(element).next().hasClass("chat-line--thread");

      return hasNextPost;
    })
    .append(
      `<button class="btn btn-outline-info btn-lg btn-reply-all" style="margin-left: 1px; padding: 0px 4px 0px 4px; font-size: 1.2rem; color: grey;">Reply All</button>`
    );
};

const sanitizeBody = (body: string): string => {
  // Remove @ default mentions from the string to avoid unnecessarily notifying people
  return body.replace(/(?=\s*)@/, "@.");
};

const renderReplyAllTrixMessage = (event: any): void => {
  const creatorName = $(event.currentTarget)
    .parent()
    .find(".chat-line__author")
    .text();
  const articleCreatedAt = $(event.currentTarget)
    .parent()
    .find("time")
    .attr("datetime");
  const friendlyTimeMessage = `há ${computeFriendlyDifferenceFromNow(
    articleCreatedAt
  )} atrás`;
  const creatorId = $(event.currentTarget).parent().attr("data-creator-id");
  const articles = $(event.currentTarget)
    .parent()
    .nextUntil($(`[data-creator-id!="` + creatorId + `"]`), "article");
  const firstLineBodyNodes = $.parseHTML(
    $(event.currentTarget).parent().find(".chat-line__body").html()
  );
  const firstMessage =
    tryBuildReplyBodyMessageFromLineBodyNodes(firstLineBodyNodes);
  const nextMessages = articles
    .map((_: any, article: any) => {
      const lineBodyNode = $.parseHTML(
        $(article).find(".chat-line__body").html()
      );

      return tryBuildReplyBodyMessageFromLineBodyNodes(lineBodyNode);
    })
    .toArray()
    .map((message: string) => `• ${message}`)
    .join("<br>");

  const body = sanitizeBody(`• ${firstMessage} <br> ${nextMessages}`);
  const reply = `<blockquote>${creatorName} - ${friendlyTimeMessage} <br> ${body}<br><br> > </blockquote>`;

  $("trix-editor").html(reply);
};

const renderReplyOnlyTrixMessage = (event: any): void => {
  const creatorName = $(event.currentTarget)
    .parent()
    .find(".chat-line__author")
    .text();
  const articleCreatedAt = $(event.currentTarget)
    .parent()
    .find("time")
    .attr("datetime");
  const friendlyTimeMessage = `há ${computeFriendlyDifferenceFromNow(
    articleCreatedAt
  )} atrás`;
  const article = $(event.currentTarget).closest("article")[0];
  const lineBodyNodes = $.parseHTML($(article).find(".chat-line__body").html());
  const bodyMessage = sanitizeBody(
    tryBuildReplyBodyMessageFromLineBodyNodes(lineBodyNodes)
  );
  const reply = `<blockquote>${creatorName} - ${friendlyTimeMessage} <br> • ${bodyMessage}<br><br> > </blockquote>`;

  $("trix-editor").html(reply);
};

/**
 * Event Handlers
 */

export const createReplyEventHandlers = (): void => {
  $("article.chat-line")
    .off()
    .on("click", ".btn-reply-all, .btn-reply", function (event) {
      const isReplyAll = $(event.currentTarget).hasClass("btn-reply-all");

      if (isReplyAll) {
        renderReplyAllTrixMessage(event);
      } else {
        renderReplyOnlyTrixMessage(event);
      }
    });
};
