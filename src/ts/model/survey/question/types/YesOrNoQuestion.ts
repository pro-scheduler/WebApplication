import Question, { Type } from '../Question';

export default class YesOrNoQuestion implements Question {
  constructor(public id: number, public question: string, public type: Type = Type.YES_OR_NO) {}
}
