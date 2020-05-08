import {FormArray, FormControl, ValidationErrors} from "@angular/forms";

export class CustomValidator {

  static questionsRequired(questions: FormArray): ValidationErrors {
    const forbidden = questions.length <= 0;
    return forbidden ? {'questionsRequired': {'message': "Test should have at least 1 question!"}} : null;
  }

  static commentRequired(comment: FormControl) : ValidationErrors {
    const forbidden = comment.value == null || (comment.value as string).length <= 0;
    return forbidden ? {'commentRequired': {'message': "You can't leave an empty comment!"}} : null;
  }
}
