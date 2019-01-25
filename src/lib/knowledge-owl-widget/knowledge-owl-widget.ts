import {
  ChangeDetectionStrategy,
  Component, OnInit,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'knowledge-owl-widget',
  template: '',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'knowledgeOwlWidget',
  providers: []
})
export class KnowledgeOwlWidget implements OnInit {
  ko;
  _ko16_p;

  constructor() {}

  ngOnInit() {
    this.loadKnowledgeOwlScript();
  }

  private loadKnowledgeOwlScript() {
    this._ko16_p = this._ko16_p || [];
    this._ko16_p.push([
      '_setProject',
      '5bf3cb528e121cef79ec4329-5bf3cb6e8e121c7577ec4310' // FIXME: Should be dynamic based on consumer
    ]);
    window['_ko16_p'] = this._ko16_p; // TODO: Find proper solution for this
    this.ko = document.createElement('script');
    this.ko.type = 'text/javascript';
    this.ko.async = true;
    this.ko.src =
      '//oncehub.knowledgeowl.com/javascript/ko-index?__pc=5bf3cb528e121cef79ec4329-5bf3cb6e8e121c7577ec4310';// FIXME: Should be dynamic
    document.head.appendChild(this.ko);
    this.ko.addEventListener('load', function () {});
  }
}
