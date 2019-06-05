import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getCourseData(courseName: string): Observable<CourseData> {
    return of(new CourseData('https://www.youtube.com/embed/xI1PWsRZIgY', 'Lorem ipsum dolor sit amet, sea harum praesent ea, id nulla scripta mediocrem eam. In his vero doctus corrumpit, ei erat doctus principes est. Justo efficiantur ne cum, eu audiam recteque patrioque has, vim option numquam in. Per alia insolens in, et ius dolor exerci. An nam possim singulis. Eu partem prompta sea, vel aliquid dissentiunt id.\n' +
      '\n' +
      '    Eum ne altera definiebas, eos simul mollis fabulas at. Quem saperet placerat an vim, ad vis errem eripuit voluptua, eu nec placerat postulant. Sint essent partiendo no mei, in eos dolore invenire aliquando, mel at inani iuvaret recusabo. Quot audiam sea ut, case utinam veritus vis ad. Illud assum urbanitas vix ne, vel in utroque appetere conceptam. Omnium perpetua cotidieque has ne, nam rebum mundi postea ea.\n' +
      '\n' +
      '    Vix albucius elaboraret suscipiantur in. Ea sit dicta graece, natum contentiones sea et. Est alii antiopam mandamus no. Te sea meis dolorem, sint justo legere ius ut, everti consequuntur ei nam. Sea diam populo et, sale copiosae voluptaria mel te. Facilisi constituam cu mel, sumo aliquam no vix, quo te erat laudem.\n' +
      '\n' +
      '    Eligendi deserunt efficiantur sed et, eum idque aeque evertitur eu. Summo splendide dissentiet sed ut, ut pro cetero utamur eruditi. Id vix tempor civibus, commodo percipitur mel ne. Cum in quod partiendo, ius summo sensibus partiendo id. Cu erroribus ullamcorper mel, vel legere elaboraret eu.\n' +
      '\n' +
      '    Discere tacimates mandamus at mea, at splendide reformidans necessitatibus vix. Paulo partem repudiare te per, mel no suas magna. Te magna virtute has, quo fabulas ceteros facilisis ex. Eu hinc ipsum feugait eam, et fabulas philosophia eam, at mea primis evertitur. Cu mel habemus accumsan definitionem, nulla tincidunt in per. Vim sententiae appellantur cu, ut vel possim dignissim, case iusto an vel.',
      'https://docs.google.com/document/d/1Qc3cIYTvjSXiRirr8vEzOJnRifrh94EqvEoSsnweKck/edit?usp=sharing'));
  }
}

export class CourseData {
  private _videoLink: string;
  private _courseText: string;
  private _attachmentLink: string;


  constructor(videoLink: string, courseText: string, attachmentLink: string) {
    this._videoLink = videoLink;
    this._courseText = courseText;
    this._attachmentLink = attachmentLink;
  }


  get videoLink(): string {
    return this._videoLink;
  }

  set videoLink(value: string) {
    this._videoLink = value;
  }

  get courseText(): string {
    return this._courseText;
  }

  set courseText(value: string) {
    this._courseText = value;
  }

  get attachmentLink(): string {
    return this._attachmentLink;
  }

  set attachmentLink(value: string) {
    this._attachmentLink = value;
  }
}
