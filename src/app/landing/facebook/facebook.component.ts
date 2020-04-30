import {Component, Inject, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.scss']
})
export class FacebookComponent implements OnInit, OnDestroy {
  safeHtml: SafeHtml;

  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    let script = this._renderer2.createElement('script');
    script.id = 'facebookScript';
    script.text = 'if (typeof FB !== \'undefined\') {FB.XFBML.parse();}';

    this._renderer2.appendChild(this._document.head, script);
  }

  ngOnDestroy(): void {
    this._document.head.removeChild(this._document.getElementById('facebookScript'));
  }


}
