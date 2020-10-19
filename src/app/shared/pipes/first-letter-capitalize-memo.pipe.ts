import {Pipe, PipeTransform} from '@angular/core';
import memo from 'memo-decorator';

@Pipe({
  name: 'firstLetterCapitalizeMemo'
})

export class FirstLetterCapitalizeMemoPipe implements PipeTransform {

  /**
   * This is a basic usage of the 'memo' decorator which is an external NPM package.
   * Memo decorator uses memoization pattern and allows to save
   * some amount of memory in a big and complicated Applications.
   */
  @memo()
  /**
   * Pipe that converts the passed string to the first letter and
   * returns the capitalized letter.
   * Even though Angular has such pipe from the hood, this example
   * has been created to show the memoization pattern usage with a pipes.
   * This Pipe is being used in the Chat window (simulates User avatar)
   * @param value {string} - value to convert
   */
  transform(value): string {
    if (value) {
      return this.getCapitalizedFirstStringLetter(value);
    }
    return value;
  }

  /**
   * Returns capitalized first symbol of a string
   * @param value {string}
   */
  getCapitalizedFirstStringLetter(value): string {
    return value[0].toUpperCase();
  }
}
