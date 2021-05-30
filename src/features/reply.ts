// Packages
import $ from "jquery";

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
  const allContent = $(event.currentTarget)
    .parent()
    .nextUntil($(`[data-creator-id!="` + creatorId + `"]`), "article");
  const firstMessage = $(event.currentTarget)
    .parent()
    .find(".chat-line__body")
    .text();
  const nextMessages = allContent
    .map((_, element) => {
      return $(element).find(".chat-line__body").text();
    })
    .toArray()
    .map((message) => `•${message}`)
    .join("<br>");
  const body = `•${firstMessage} <br> ${nextMessages}`;
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
  const body = $(article).find(".chat-line__body").text();
  const reply = `<blockquote>${creatorName} - ${friendlyTimeMessage} <br> •${body}<br><br> > </blockquote>`;

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
