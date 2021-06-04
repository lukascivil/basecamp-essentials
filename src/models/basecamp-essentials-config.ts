export type SerializedFormConfig = Array<{
  name: "chatSummary";
  value: "true" | "false";
}>;

export type BasecampEssentialsConfigStorage =
  | undefined
  | {
      basecamp_essentials_config: SerializedFormConfig;
    };

export type BasecampEssentialsConfigParsed =
  | undefined
  | { chatSummary: "true" | "false" };
