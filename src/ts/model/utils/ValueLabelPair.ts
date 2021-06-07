export class ValueLabelPair {
  constructor(public value: string | number | boolean, public label: string | number | boolean) {}
}

export const optionToValueLabelPair = (option: string | number | boolean) => {
  return new ValueLabelPair(option, option);
};

export const valueLabelPairsToOptions = (pairs: ValueLabelPair[]) => {
  return pairs.map((valueLabelPair: ValueLabelPair) => valueLabelPair.value.toString());
};
