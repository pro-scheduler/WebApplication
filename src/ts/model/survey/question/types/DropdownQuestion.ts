import Question, { Type } from '../Question';

export default class DropdownQuestion implements Question {
  constructor(
    public id: number,
    public question: string,
    public possibleChoices: string[],
    public type: Type = Type.DROPDOWN
  ) {}
}
