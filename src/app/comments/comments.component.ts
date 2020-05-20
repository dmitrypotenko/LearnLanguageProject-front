import {Component, Input, OnInit} from '@angular/core';
import {CommentService} from "./comment.service";
import {CommentData} from "./CommentData";
import {FormControl} from "@angular/forms";
import {NotificationService} from "../error/NotificationService";
import {ConcessionDialogComponent} from "../course/course-list/concession-dialog/concession-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../auth/auth.service";
import {CustomValidator} from "../course/course-edit/field-error/Validators";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  ckConfig = {
    customConfig: '/assets/comment_config.js',
    placeholder: "Leave a comment here..."
  };


  _threadId: string = null;

  get threadId() {
    return this._threadId;
  }

  @Input()
  set threadId(threadId: string) {
    this._threadId = threadId;
    if (this.authService.isPlatformBrowser()) {
      this.commentService.getComments(this.threadId).subscribe(comments => {
        this.comments = comments;
      })
    }
    this.invalidate();
  }

  comments: CommentData[];
  currentComment = new FormControl('', CustomValidator.commentRequired);
  editingComment: CommentData;
  mode = 'create';
  private dialog: MatDialog;

  constructor(private commentService: CommentService, private notificationService: NotificationService, dialog: MatDialog,
              public authService: AuthService) {
    this.dialog = dialog;
  }

  ngOnInit(): void {

  }

  onSubmit() {
    console.log("submit triggered!");
    if (!this.currentComment.valid) {
      this.notificationService.showError("You can't leave an empty comment!");
      return
    }
    if (this.mode == 'create') {
      this.commentService.createComment(new CommentData(null, this.currentComment.value as string, this.threadId, new Date(), new Date(), false, null, null)).subscribe(createdComment => {
        this.comments.unshift(createdComment);
        this.invalidate();
        this.notificationService.showSuccess("Saved successfully!");
      })
    } else {
      this.editingComment.commentText = this.currentComment.value as string;
      this.commentService.updateComment(this.editingComment).subscribe(response => {
        if (response.status == 200) {
          this.notificationService.showSuccess("Saved successfully!");
          this.invalidate();
        }
      })
    }
  }

  private invalidate() {
    if (this.editingComment != null) {
      this.editingComment.editable = true;
    }
    this.mode = 'create';
    this.editingComment = null;
    this.currentComment.setValue('');
  }

  update($event: CommentData) {
    if (this.editingComment != null) {
      this.editingComment.editable = true;
    }
    this.mode = 'edit';
    this.currentComment.setValue($event.commentText);
    this.editingComment = $event;
  }

  askToDelete($event: CommentData) {
    this.dialog.open(ConcessionDialogComponent, {height: '20vh', width: '30vw', hasBackdrop: true})
      .afterClosed().subscribe(result => {
      if (result) {
        this.commentService.deleteComment($event.id).subscribe(response => {
          if (response.status == 200) {
            const index: number = this.comments.indexOf($event);
            if (index !== -1) {
              this.comments.splice(index, 1);
            }
            this.notificationService.showSuccess("Deleted successfully!");
          }
        })
      }
    });
  }

  cancelEditing() {
    this.invalidate();
  }
}
