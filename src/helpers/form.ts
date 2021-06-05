// Packages
import {
  ParsedConfig,
  SerializedArrayFormConfig,
} from "../models/basecamp-essentials-config";

export const ParseSerializedArrayFormConfig = (
  formValues: SerializedArrayFormConfig
): ParsedConfig => {
  return formValues.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.value;

    return accumulator;
  }, {} as any);
};
