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
  $("turbo-frame.chat-line")
    .not(".chat-line--me")
    .append(
      `<button class="btn btn-outline-info btn-lg btn-reply" style="padding: 0px 4px 0px 4px; font-size: 1.2rem; color: grey;">Reply</button>`
    );

  $("turbo-frame.chat-line")
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
  const turboFrames = $(event.currentTarget)
    .parent()
    .nextUntil($(`[data-creator-id!="` + creatorId + `"]`), "turbo-frame");
  const firstLineBodyNodes = $.parseHTML(
    $(event.currentTarget).parent().find(".chat-line__body").html()
  );
  const firstMessage =
    tryBuildReplyBodyMessageFromLineBodyNodes(firstLineBodyNodes);
  const nextMessages = turboFrames
    .map((_, turboFrame) => {
      const lineBodyNode = $.parseHTML(
        $(turboFrame).find(".chat-line__body").html()
      );

      return tryBuildReplyBodyMessageFromLineBodyNodes(lineBodyNode);
    })
    .toArray()
    .map((message) => `• ${message}`)
    .join("<br>");

  const body = `• ${firstMessage} <br> ${nextMessages}`;
  const reply = `${creatorName} - ${friendlyTimeMessage} <br> ${body}<br><br> >`;

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
  const turboFrame = $(event.currentTarget).closest("turbo-frame")[0];
  const lineBodyNodes = $.parseHTML(
    $(turboFrame).find(".chat-line__body").html()
  );
  const bodyMessage = tryBuildReplyBodyMessageFromLineBodyNodes(lineBodyNodes);
  const reply = `${creatorName} - ${friendlyTimeMessage} <br> • ${bodyMessage}<br><br> >`;

  $("trix-editor").html(reply);
};

/**
 * Event Handlers
 */

export const createReplyEventHandlers = (): void => {
  $("turbo-frame.chat-line")
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
