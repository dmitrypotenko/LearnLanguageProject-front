import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {appUrl} from '../../constants';

export class FileSender {
  constructor(private http: HttpClient) {
  }

  sendFile(file: File): Observable<UploadUrl> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'multipart/form-data');
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http
      .post<UploadUrl>(appUrl + '/files/', formData);
  }
}

export class UploadUrl {
  constructor(public fileUrl: string) {
  }

  toJSON() {
    const jsonObj = {};
    const proto = Object.getPrototypeOf(this);
    for (const key of Object.getOwnPropertyNames(proto)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      const hasGetter = desc && typeof desc.get === 'function';
      if (hasGetter) {
        jsonObj[key] = this[key];
      }
    }
    return jsonObj;
  }
}
