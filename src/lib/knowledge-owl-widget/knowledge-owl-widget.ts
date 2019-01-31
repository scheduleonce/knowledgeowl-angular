import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {
  getKnowledgeWidgetPoductKeyMissingError,
  getKnowledgeWidgetPoductURLMissingError
} from './knowledge-owl-widget-errors';

@Component({
  selector: 'knowledge-owl-widget',
  template: '',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'knowledgeOwlWidget',
  providers: []
})
export class KnowledgeOwlWidget implements OnInit, AfterContentInit {
  ko;
  _ko16_p;

  /** Product URL to access KnowledgeOwl widget. */
  @Input()
  projectURL: string;

  /** Product key to access KnowledgeOwl widget. */
  @Input()
  projectKey: string;

  constructor() {}

  ngOnInit() {
    this.initWidget();
    this.loadScript();
  }

  ngAfterContentInit() {
    this._validateWidgetInputs();
  }

  /**
   * Validates the widget's inputs.
   * @private
   */
  protected _validateWidgetInputs() {
    this._validateProductURL();
    this._validateProductKey();
  }

  /**
   * Private methods
   */

  /**
   * Throws an error if the productKey input is missing.
   * @private
   */
  private _validateProductKey() {
    if (!this.projectKey) {
      throw getKnowledgeWidgetPoductKeyMissingError();
    }
  }

  /**
   * Throws an error if the productURL input is missing.
   * @private
   */
  private _validateProductURL() {
    if (!this.projectURL) {
      throw getKnowledgeWidgetPoductURLMissingError();
    }
  }

  /**
   * Initializes the widget.
   * @private
   */
  private initWidget() {
    this._ko16_p = this._ko16_p || [];
    this._ko16_p.push(['_setProject', this.projectKey]);
    window['_ko16_p'] = this._ko16_p;
  }

  /**
   * Loads script into page
   * @private
   */
  private loadScript() {
    this.ko = document.createElement('script');
    this.ko.type = 'text/javascript';
    this.ko.async = true;
    this.ko.src = `${this.projectURL}?__pc=${this.projectKey}`;
    document.head.appendChild(this.ko);
  }
}
