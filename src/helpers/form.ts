type ParsedSerializedArrayForm = {
  [key: string]: string;
};

export const ParseSerializedArrayForm = <T = ParsedSerializedArrayForm>(
  formValues: Array<JQuery.NameValuePair>
): T => {
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
