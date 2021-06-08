export type ConfigStorage = {
  config?: ParsedConfig;
};

export type ParsedConfig = {
  chatSummary: "true" | "false";
  coloredChatBorder: "true" | "false";
};
