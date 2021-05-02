import Question, { Type } from '../Question';

export default class OpenQuestion implements Question {
  constructor(
    public question: string,
    public id: number | null = null,
    public type: Type = Type.OPEN
  ) {}
}
