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

export const compareKeys = (a: any = {}, b: any = {}): Boolean => {
  let aKeys: Array<string> = [];
  let bKeys: Array<string> = [];

  try {
    aKeys = Object.keys(a).sort();
    bKeys = Object.keys(b).sort();
  } catch (error) {
    return false;
  }

  return JSON.stringify(aKeys) === JSON.stringify(bKeys);
};
