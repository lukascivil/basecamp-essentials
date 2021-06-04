export type BasecampEssentialsConfigStorage =
  | undefined
  | {
      basecamp_essentials_config: Array<{
        name: "chatSummary";
        value: "true" | "false";
      }>;
    };

export type BasecampEssentialsConfigParsed =
  | undefined
  | { chatSummary: "true" | "false" };
