// Packages
import $ from "jquery";

const buildLineBodyRecursiveMessageFromNode = (
  // eslint-disable-next-line no-undef
  node: JQuery.Node
): string => {
  let message = $(node).text().trim();
  const tagName = $(node).prop("tagName");

  if (tagName === "BLOCKQUOTE") {
    const contents = $(node).contents();
    const messages: Array<string> = contents
      .toArray()
      .map((element) => buildLineBodyRecursiveMessageFromNode(element));

    return messages.join(" ");
  }

  if (tagName === "BC-ATTACHMENT") {
    return `@${message}`;
  }

  return message;
};

export const tryBuildReplyBodyMessageFromNodes = (
  // eslint-disable-next-line no-undef
  lineBodyNodes: Array<JQuery.Node>
): string => {
  return lineBodyNodes
    .map((element) => {
      let message = "";

      try {
        message = buildLineBodyRecursiveMessageFromNode(element);
      } catch (error) {
        return "error";
      }

      return message;
    })
    .filter((text) => text.length > 0)
    .join(" ");
};
