// Packages
import $ from "jquery"

const buildLineBodyRecursiveMessageFromNode = (node: JQuery.Node): string => {
  const message = $(node).text().trim()
  const tagName = $(node).prop("tagName")

  if (tagName === "BLOCKQUOTE") {
    const contents = $(node).contents()
    const messages: Array<string> = contents
      .toArray()
      .map((element) => buildLineBodyRecursiveMessageFromNode(element))

    return messages.join(" ")
  }

  if (tagName === "BC-ATTACHMENT") {
    return `@${message}`
  }

  return message
}

export const tryBuildReplyBodyMessageFromLineBodyNodes = (
  lineBodyNodes: Array<JQuery.Node>,
): string => {
  return lineBodyNodes
    .map((element) => {
      let message: string

      try {
        message = buildLineBodyRecursiveMessageFromNode(element)
      } catch {
        return "error"
      }

      return message
    })
    .filter((text) => text.length > 0)
    .join(" ")
}
