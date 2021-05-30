import $ from "jquery";

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

/**
 * Event Handlers
 */

export const removeEventHandlers = (): void => {
  $(
    "article.chat--full-screen .btn-reply, article.chat--full-screen .btn-reply-all"
  ).off();
};

export const createEventHandlers = (): void => {
  $("article.chat--full-screen").on("click", ".btn-reply-all", function (e) {
    const creatorName = $(e.currentTarget)
      .parent()
      .find(".chat-line__author")
      .text();
    const creatorId = $(e.currentTarget).parent().attr("data-creator-id");
    const allContent = $(e.currentTarget)
      .parent()
      .nextUntil($(`[data-creator-id!="` + creatorId + `"]`), "article");
    const firstMessage = $(e.currentTarget)
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
    const reply = `<blockquote>${creatorName} <br> ${body}<br><br> > </blockquote>`;

    $("trix-editor").html(reply);
  });

  $("article.chat--full-screen").on("click", ".btn-reply", function (e) {
    const creatorName = $(e.currentTarget)
      .parent()
      .find(".chat-line__author")
      .text();
    const article = $(e.currentTarget).closest("article")[0];
    const body = $(article).find(".chat-line__body").text();
    const reply = `<blockquote>${creatorName} <br> •${body}<br><br> > </blockquote>`;

    $("trix-editor").html(reply);
  });
};
