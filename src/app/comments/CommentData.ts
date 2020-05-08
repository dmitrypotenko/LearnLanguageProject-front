export class CommentData {
  constructor(public id: number,
              public commentText: string,
              public threadId: string,
              public createDate: Date,
              public updateDate: Date,
              public editable: boolean,
              public userName: string,
              public userPic: string,
              ) {
  }
}
