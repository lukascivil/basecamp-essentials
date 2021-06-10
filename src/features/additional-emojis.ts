// Packages
import $ from "jquery";

/**
 * Renders
 */

export const renderEmojis = (): void => {
  const hasAdditionalEmojis = $("[title='Castle']").length;

  if (hasAdditionalEmojis) {
    return;
  }

  $(".emoji-picker__emojis").append(
    `<button name="button" type="button" title="Castle" class="emoji-picker__button plain-btn" data-role="emoji_picker_character">🏰</button>
    <button name="button" type="button" title="Rock" class="emoji-picker__button plain-btn" data-role="emoji_picker_character">🪨</button>
    <button name="button" type="button" title="Panda Face" class="emoji-picker__button plain-btn" data-role="emoji_picker_character">🐼</button>
    <button name="button" type="button" title="Unicorn" class="emoji-picker__button plain-btn" data-role="emoji_picker_character">🦄</button>
    <button name="button" type="button" title="Bug" class="emoji-picker__button plain-btn" data-role="emoji_picker_character">🐞</button>
    <button name="button" type="button" title="Rocket" class="emoji-picker__button plain-btn" data-role="emoji_picker_character">🚀</button>
    <button name="button" type="button" title="Bomb" class="emoji-picker__button plain-btn" data-role="emoji_picker_character">💣</button>
    <button name="button" type="button" title="Star" class="emoji-picker__button plain-btn" data-role="emoji_picker_character">⭐</button>
    <button name="button" type="button" title="Building Construction" class="emoji-picker__button plain-btn" data-role="emoji_picker_character">🏗️</button>
    <button name="button" type="button" title="Construction" class="emoji-picker__button plain-btn" data-role="emoji_picker_character">🚧</button>
    <button name="button" type="button" title="Coffee" class="emoji-picker__button plain-btn" data-role="emoji_picker_character">☕</button>
    <button name="button" type="button" title="Memo" class="emoji-picker__button plain-btn" data-role="emoji_picker_character">📝</button>
    <button name="button" type="button" title="Warning" class="emoji-picker__button plain-btn" data-role="emoji_picker_character">⚠️</button>
    <button name="button" type="button" title="Cross Mark" class="emoji-picker__button plain-btn" data-role="emoji_picker_character">❌</button>
    <button name="button" type="button" title="OK Button" class="emoji-picker__button plain-btn" data-role="emoji_picker_character">🆗</button>`
  );
};

export const renderAdditionalEmojis = (): void => {
  renderEmojis();
};
