import Question, { Type } from '../Question';

export default class YesOrNoQuestion implements Question {
  constructor(
    public question: string,
    public id: number | null = null,
    public type: Type = Type.YES_OR_NO
  ) {}
}
