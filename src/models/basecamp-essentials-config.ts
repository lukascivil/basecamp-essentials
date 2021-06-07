export type SerializedArrayFormConfig = Array<{
  name: "chatSummary" | "coloredChatBorder";
  value: "true" | "false";
}>;

export type ConfigStorage = {
  config?: ParsedConfig;
};

export type ParsedConfig = {
  chatSummary: "true" | "false";
  coloredChatBorder: "true" | "false";
};
