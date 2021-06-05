export type SerializedArrayFormConfig = Array<{
  name: "chatSummary";
  value: "true" | "false";
}>;

export type ConfigStorage = {
  config?: ParsedConfig;
};

export type ParsedConfig = {
  chatSummary: "true" | "false";
};
