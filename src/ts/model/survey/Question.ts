export type Question = {
  id: number | null;
  question: string;
  type: Type;
};

export enum Type {
  OPEN = 'OPEN',
  MULTI_CHOICE = 'MULTI_CHOICE',
  YES_OR_NO = 'YES_OR_NO',
  DROPDOWN = 'DROPDOWN',
  LINEAR_SCALE = 'LINEAR_SCALE',
}

export class OpenQuestion implements Question {
  constructor(
    public question: string,
    public id: number | null = null,
    public type: Type = Type.OPEN
  ) {}
}

export class MultiChoiceQuestion implements Question {
  constructor(
    public question: string,
    public possibleChoices: string[],
    public id: number | null = null,
    public type: Type = Type.MULTI_CHOICE
  ) {}
}

export class YesOrNoQuestion implements Question {
  constructor(
    public question: string,
    public id: number | null = null,
    public type: Type = Type.YES_OR_NO
  ) {}
}

export class DropdownQuestion implements Question {
  constructor(
    public question: string,
    public possibleOptions: string[],
    public id: number | null = null,
    public type: Type = Type.DROPDOWN
  ) {}
}

export class LinearScaleQuestion implements Question {
  constructor(
    public question: string,
    public fromValue: number = 0,
    public toValue: number = 10,
    public id: number | null = null,
    public type: Type = Type.LINEAR_SCALE
  ) {}
}

export const getQuestionFromJson = (question: any): Question | undefined => {
  switch (question.type) {
    case Type.OPEN:
      return new OpenQuestion(question.id, question.question);
    case Type.MULTI_CHOICE:
      return new MultiChoiceQuestion(question.id, question.question, question.possibleChoices);
    case Type.YES_OR_NO:
      return new YesOrNoQuestion(question.id, question.question);
    case Type.DROPDOWN:
      return new DropdownQuestion(question.id, question.question, question.possibleOptions);
    case Type.LINEAR_SCALE:
      return new LinearScaleQuestion(
        question.id,
        question.question,
        question.fromValue,
        question.toValue
      );
    default:
      return undefined;
  }
};
