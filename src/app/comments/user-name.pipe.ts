import { Pipe, PipeTransform } from '@angular/core';
import {UserData} from "../auth/UserData";

@Pipe({
  name: 'userName'
})
export class UserNamePipe implements PipeTransform {

  transform(value: UserData, ...args: unknown[]): string {
    return value.name;
  }

}
