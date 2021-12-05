// Packages
import $ from "jquery";

// Helpers
import { tryBuildReplyBodyMessageFromLineBodyNodes } from "../helpers/reply-messages";
import { sanitizeChatBody } from "../helpers/string";

// Utils
import { computeFriendlyDifferenceFromNow } from "../utils/time";

/**
 * Renders
 */
export const removeReplyButtons = (): void => {
  $(".btn-reply, .btn-reply-solo-figcaption, .btn-reply-all").detach();
};

export const renderReplyButtons = (): void => {
  const chatLineForReply = $("turbo-frame.chat-line").not(".chat-line--me");

  /**
   * Reply
   */
  chatLineForReply
    .find(".chat-line__timestamp")
    .append(
      `<button class="btn btn-outline-info btn-lg btn-reply" style="padding: 0px 4px 0px 4px; font-size: 1rem; color: grey;">Reply</button>`
    );

  /**
   * Reply Solo
   */
  chatLineForReply
    .filter((_, element) => {
      const hasNextPost = $(element).hasClass("chat-line--thread");

      return hasNextPost;
    })
    .find(".chat-line__meta")
    .after(
      `<figcaption class="btn-reply-solo-figcaption">
      <span class="attachment__attribute attachment__name">
        <button class="btn btn-outline-info btn-lg btn-reply-solo" style="padding: 0px 4px 0px 4px; font-size: 1rem; color: grey;">Reply</button>
      </span>
    </figcaption>`
    );

  /**
   * Reply All
   */
  $("turbo-frame.chat-line")
    .not(".chat-line--thread")
    .not(".chat-line--me")
    .filter((_, element) => {
      const hasNextPost = $(element).next().hasClass("chat-line--thread");

      return hasNextPost;
    })
    .find(".chat-line__timestamp")
    .append(
      `<button class="btn btn-outline-info btn-lg btn-reply-all" style="margin-left: 1px; padding: 0px 4px 0px 4px; font-size: 1rem; color: grey;">Reply All</button>`
    );
};

const renderReplyAllTrixMessage = (event: any): void => {
  const creatorName = $(event.currentTarget)
    .parent()
    .parent()
    .find(".chat-line__author")
    .text();
  const articleCreatedAt = $(event.currentTarget)
    .parent()
    .find("time")
    .attr("datetime");
  const friendlyTimeMessage = `${computeFriendlyDifferenceFromNow(
    articleCreatedAt
  )} atrás`;
  const creatorId = $(event.currentTarget)
    .parent()
    .parent()
    .parent()
    .parent()
    .attr("data-creator-id");
  const turboFrames = $(event.currentTarget)
    .parent()
    .parent()
    .parent()
    .parent()
    .nextUntil($(`[data-creator-id!="` + creatorId + `"]`), "turbo-frame");
  const firstLineBodyNodes = $.parseHTML(
    $(event.currentTarget)
      .parent()
      .parent()
      .parent()
      .find(".chat-line__body")
      .html()
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

  const body = sanitizeChatBody(`• ${firstMessage} <br> ${nextMessages}`);
  const reply = `${creatorName} - ${friendlyTimeMessage} <br> ${body}<br><br> >`;

  $("trix-editor").html(reply);
};

const renderReplyOnlyTrixMessage = (event: any): void => {
  const creatorName = $(event.currentTarget)
    .parent()
    .parent()
    .find(".chat-line__author")
    .text();
  const articleCreatedAt = $(event.currentTarget)
    .parent()
    .find("time")
    .attr("datetime");
  const friendlyTimeMessage = `${computeFriendlyDifferenceFromNow(
    articleCreatedAt
  )} atrás`;
  const turboFrame = $(event.currentTarget).closest("turbo-frame")[0];
  const lineBodyNodes = $.parseHTML(
    $(turboFrame).find(".chat-line__body").html()
  );
  const bodyMessage = sanitizeChatBody(
    tryBuildReplyBodyMessageFromLineBodyNodes(lineBodyNodes)
  );
  const reply = `${creatorName} - ${friendlyTimeMessage} <br> • ${bodyMessage}<br><br> >`;

  $("trix-editor").html(reply);
};

const renderReplySoloTrixMessage = (event: any): void => {
  const creatorName = $(event.currentTarget)
    .parent()
    .parent()
    .parent()
    .find(".chat-line__author")
    .text();
  const articleCreatedAt = $(event.currentTarget)
    .parent()
    .parent()
    .parent()
    .find("time")
    .attr("datetime");
  const friendlyTimeMessage = `${computeFriendlyDifferenceFromNow(
    articleCreatedAt
  )} atrás`;
  const turboFrame = $(event.currentTarget).closest("turbo-frame")[0];
  const lineBodyNodes = $.parseHTML(
    $(turboFrame).find(".chat-line__body").html()
  );
  const bodyMessage = sanitizeChatBody(
    tryBuildReplyBodyMessageFromLineBodyNodes(lineBodyNodes)
  );
  const reply = `${creatorName} - ${friendlyTimeMessage} <br> • ${bodyMessage}<br><br> >`;

  $("trix-editor").html(reply);
};

/**
 * Event Handlers
 */

export const createReplyEventHandlers = (): void => {
  $("turbo-frame.chat-line")
    .off()
    .on(
      "click",
      ".btn-reply-all, .btn-reply, .btn-reply-solo",
      function (event) {
        const replyStatus = $(event.currentTarget).hasClass("btn-reply-all")
          ? "btn-reply-all"
          : $(event.currentTarget).hasClass("btn-reply-solo")
          ? "btn-reply-solo"
          : "btn-reply";

        if (replyStatus === "btn-reply-all") {
          renderReplyAllTrixMessage(event);
        } else if (replyStatus === "btn-reply") {
          renderReplyOnlyTrixMessage(event);
        } else {
          renderReplySoloTrixMessage(event);
        }
      }
    );
};
