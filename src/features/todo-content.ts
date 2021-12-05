// Packages
import $ from "jquery";

/**
 * Renders
 */

export const renderTodoContent = (): void => {
  const hasTodoContentButton = $(".todo-content").length;

  if (hasTodoContentButton) {
    return;
  }

  const parent = $("[data-attribute='todo_description']").find(
    ".trix-button-row"
  );

  const newTodoContentButton = parent
    .find("span.trix-button-group.trix-button-group--file-tools")
    .clone()
    .addClass("todo-content")
    .html(
      '<button type="button" class="trix-button" title="Default content" tabindex="-1">D</button>'
    );

  parent
    .find("span.trix-button-group.trix-button-group--file-tools")
    .after(newTodoContentButton);
};

/**
 * Event Handlers
 */

export const createTodoContentEventHandlers = (): void => {
  $(".todo-content")
    .off()
    .on("click", ".trix-button", function () {
      const content =
        "<div><!--block--><strong>Contexto</strong>:</div><ul><li><!--block--><br></li></ul><div><!--block--><strong>Problema</strong>:</div><ul><li><!--block--><br></li></ul><div><!--block--><strong>Objetivo</strong>:</div><ul><li><!--block--><br></li></ul><div><!--block--><strong>Sugestão</strong>:&nbsp;</div><ul><li><!--block--><br></li></ul>";

      $("[data-attribute='todo_description']")
        .find("trix-editor")
        .html(content);
    });
};
