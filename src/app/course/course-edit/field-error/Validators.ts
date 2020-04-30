import {FormArray, ValidationErrors} from "@angular/forms";

export class QuestionsValidator {

  static questionsRequired(questions: FormArray): ValidationErrors {
    const forbidden = questions.length <= 0;
    return forbidden ? {'questionsRequired': {'message': "Test should have at least 1 question!"}} : null;
  }

}
