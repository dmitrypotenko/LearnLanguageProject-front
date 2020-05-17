import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {UserData} from "../../auth/user.data";
import {CommentData} from "../CommentData";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  user: Observable<UserData>;

  @Input()
  comment: CommentData;
  @Output()
  update = new EventEmitter<CommentData>();
  @Output()
  delete = new EventEmitter<CommentData>();

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.user = this.authService.user;
  }


  updateComment() {
    this.comment.editable = false;
    this.update.emit(this.comment);
  }

  deleteComment() {
    this.delete.emit(this.comment);
  }
}
