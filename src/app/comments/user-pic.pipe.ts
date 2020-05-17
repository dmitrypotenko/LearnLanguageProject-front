import { Pipe, PipeTransform } from '@angular/core';
import {UserData} from "../auth/user.data";

@Pipe({
  name: 'userPic'
})
export class UserPicPipe implements PipeTransform {

  transform(value: UserData, ...args: unknown[]): string {
    return value.pictureUrl;
  }

}
