import Question, { Type } from '../Question';

export default class LinearScaleQuestion implements Question {
  constructor(
    public question: string,
    public fromValue: number = 0,
    public toValue: number = 10,
    public id: number | null = null,
    public type: Type = Type.LINEAR_SCALE
  ) {}
}
