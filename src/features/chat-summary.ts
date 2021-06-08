// Packages
import $ from "jquery";

// Models
import { ParsedConfig } from "../models/config";

/**
 * Renders
 */

export const renderChatSummary = (parsedConfig: ParsedConfig): void => {
  const domHasChatSummary = $(".chat-summary-exist").length;

  if (domHasChatSummary || parsedConfig?.chatSummary === "false") {
    return;
  }

  const authors: {
    [key in string]: { name: string; imageElement: any; value: number };
  } = $("bc-grouped-dates .date_divider")
    .last()
    .nextAll()
    .map((index, element) => {
      const name = $(element).find(".chat-line__author").text();
      const imageElement = $(element).find(".chat-line__avatar").html();

      return { name, imageElement };
    })
    .toArray()
    .filter((author) => author.name.trim() !== "")
    .reduce((acc, author) => {
      if (typeof acc[author.name] == "undefined") {
        acc[author.name] = { ...author, value: 0 };
      }

      acc[author.name] = { ...author, value: acc[author.name].value + 1 };

      return acc;
    }, {} as any);

  const elements = Object.values(authors)
    .sort((a, b) => b.value - a.value)
    .map((author) => {
      const element = $(author.imageElement).attr({
        width: "20px",
        height: "20px",
      });

      return $(
        `<div class="chat-summary-exist" style="display: inline-block; padding-right: 8px;"> +${author.value}</div>`
      ).append(element);
    });

  $(".chat__header-block").removeClass("flex--vertically-center");
  $(".chat__header-block").append(elements);
};
