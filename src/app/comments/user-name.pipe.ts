import { Pipe, PipeTransform } from '@angular/core';
import {UserData} from "../auth/user.data";

@Pipe({
  name: 'userName'
})
export class UserNamePipe implements PipeTransform {

  transform(value: UserData, ...args: unknown[]): string {
    return value.name;
  }

}
