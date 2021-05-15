import {
  DropdownQuestion,
  LinearScaleQuestion,
  MultiChoiceQuestion,
  OpenQuestion,
  Question,
  Type,
  YesOrNoQuestion,
} from './Question';

export type Answer = {
  id: number | null;
  question: Question;
  type: Type;
};

export class DropdownAnswer implements Answer {
  constructor(
    public question: DropdownQuestion,
    public dropdownChoice: string,
    public id: number | null = null,
    public type: Type = Type.DROPDOWN
  ) {}
}

export class LinearScaleAnswer implements Answer {
  constructor(
    public question: LinearScaleQuestion,
    public rating: number,
    public id: number | null = null,
    public type: Type = Type.LINEAR_SCALE
  ) {}
}

export class MultiChoiceAnswer implements Answer {
  constructor(
    public question: MultiChoiceQuestion,
    public choices: string[],
    public id: number | null = null,
    public type: Type = Type.MULTI_CHOICE
  ) {}
}

export class OpenAnswer implements Answer {
  constructor(
    public question: OpenQuestion,
    public text: string,
    public id: number | null = null,
    public type: Type = Type.OPEN
  ) {}
}

export class YesOrNoAnswer implements Answer {
  constructor(
    public question: YesOrNoQuestion,
    public decision: boolean,
    public id: number | null = null,
    public type: Type = Type.YES_OR_NO
  ) {}
}
