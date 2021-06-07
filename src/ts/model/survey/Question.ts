export enum Type {
  OPEN = 'OPEN',
  MULTI_CHOICE = 'MULTI_CHOICE',
  YES_OR_NO = 'YES_OR_NO',
  DROPDOWN = 'DROPDOWN',
  LINEAR_SCALE = 'LINEAR_SCALE',
}

export type Question = {
  id: number | null;
  question: string;
  type: Type;
  possibleChoices?: string[]; // for multiChoice
  possibleOptions?: string[]; // for dropdown
  fromValue?: number; // for linear
  toValue?: number; // for linear
};
