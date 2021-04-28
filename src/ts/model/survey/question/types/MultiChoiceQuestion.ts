import Question, { Type } from '../Question';

export default class MultiChoiceQuestion implements Question {
  constructor(
    public question: string,
    public possibleChoices: string[],
    public id: number | null = null,
    public type: Type = Type.MULTI_CHOICE
  ) {}
}
