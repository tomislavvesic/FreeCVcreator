import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'skillDisplay'
})
export class SkillDisplayPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(value){
      let numToString = value.toString()
      let percent = numToString + '%'
      return percent;
    }
    return null
  }

}
