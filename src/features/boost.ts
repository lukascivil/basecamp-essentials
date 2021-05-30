// Packages
import $ from "jquery";

/**
 * Renders
 */

export const renderBoostAttributeLength = (): void => {
  $(".boost-form__label input").attr({
    maxlength: "160",
    style: "width: 100%;",
  });
  $(".boost-form__label").attr({
    style: "width: 200px;",
  });
};
