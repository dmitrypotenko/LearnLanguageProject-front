import {UserData} from "./user.data";
import {CourseAccessLevel} from "./course-access-level";

export class CourseAccessData {
  constructor(public userDto: UserData,
              public courseAccessLevel: CourseAccessLevel) {
  }
}


export class CourseAccessDataVO {
  constructor(public userId: number,
              public courseAccessLevel: CourseAccessLevel) {
  }
}
