import {UserData} from "./user.data";
import {CourseAccessLevel} from "./course-access-level";

export class AccessData {
  constructor(public userDto: UserData,
              public accessLevel: CourseAccessLevel) {
  }
}


export class AccessDataVO {
  constructor(public userId: number,
              public accessLevel: CourseAccessLevel) {
  }
}
