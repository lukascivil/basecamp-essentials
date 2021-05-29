$(document).ready(function () {
  $("article")
    .not(".chat-line--me")
    .append(
      `<button class="btn btn-secondary btn-lg btn-reply" >Reply</button>`
    );

  $("article")
    .not(".chat-line--thread")
    .not(".chat-line--me")
    .filter((_, element) => {
      const hasNextPost = $(element).next().hasClass("chat-line--thread");

      return hasNextPost;
    })
    .append(
      `<button class="btn btn-secondary btn-lg btn-reply-all" >Reply All</button>`
    );

  $(".btn-reply-all").on("click", function (e) {
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
      .join("<br>");

    const body = `${firstMessage} <br> ${nextMessages}`;

    const reply = `<blockquote>${creatorName} <br> "${body}"<br><br> =></blockquote>`;

    $("trix-editor").html(reply);
  });

  $(".btn-reply").on("click", function (e) {
    const article = $(e.currentTarget).closest("article")[0];
    const body = $(article).find(".chat-line__body").text();

    const reply = `<blockquote>"${body}"<br><br> =></blockquote>`;

    $("trix-editor").html(reply);
  });
});
