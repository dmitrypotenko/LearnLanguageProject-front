import { Pipe, PipeTransform } from '@angular/core';
import {UserData} from "../auth/UserData";

@Pipe({
  name: 'userPic'
})
export class UserPicPipe implements PipeTransform {

  transform(value: UserData, ...args: unknown[]): string {
    return value.pictureUrl;
  }

}
