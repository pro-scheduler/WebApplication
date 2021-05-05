export class ValueLabelPair {
  constructor(public value: string | number, public label: string | number) {}
}

export const optionToValueLabelPair = (option: string | number) => {
  return new ValueLabelPair(option, option);
};
