import Answer from '../Answer';
import { Type } from '../../question/Question';
import DropdownQuestion from '../../question/types/DropdownQuestion';

export default class DropdownAnswer implements Answer {
  constructor(
    public id: number,
    public question: DropdownQuestion,
    public dropdownChoice: string,
    public type: Type = Type.DROPDOWN
  ) {}
}
