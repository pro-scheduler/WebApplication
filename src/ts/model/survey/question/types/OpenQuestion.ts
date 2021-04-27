import Question, { Type } from '../Question';

export default class OpenQuestion implements Question {
  constructor(public id: number, public question: string, public type: Type = Type.OPEN) {}
}
