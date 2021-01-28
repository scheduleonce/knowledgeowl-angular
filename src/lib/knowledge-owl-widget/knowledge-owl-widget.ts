import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {
  getKnowledgeWidgetPoductKeyMissingError,
  getKnowledgeWidgetInvalidProductURLError
} from './knowledge-owl-widget-errors';

/** Regex to validate article URL is valid or not */
const urlValidatorRegex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

@Component({
  selector: 'knowledge-owl-widget',
  template: '',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'knowledgeOwlWidget',
  providers: []
})
export class KnowledgeOwlWidget implements OnInit, AfterContentInit {
  /** Flag to check initial page location updated */
  isPageLocationUpdated = false;

  /** Product key to access KnowledgeOwl widget. */
  @Input()
  projectKey: string;

  /** Current page location for widget context. */
  private _pageLocation: string;
  @Input() set pageLocation(value: string) {
    this._pageLocation = value.trim();
    this._updatePageLocation();
  }

  get pageLocation() {
    return this._pageLocation;
  }

  constructor(@Inject('KOProjectURL') private projectURL: string) {}

  ngOnInit() {
    this._initWidget();
    this._loadScript();
  }

  ngAfterContentInit() {
    this._validateWidgetInputs();
    this._initPageLocation();
  }

  /** Opens the widget. */
  open(article = '') {
    if (!window['__ko16']) {
      return;
    }
    if (article) {
      const widgetHref = `${this.projectURL}/help/fetch-article/hash/${article}`;
      window['__ko16'].openArticle(widgetHref);
    } else {
      window['__ko16']._toggleOpen();
    }
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
    if (!this.projectURL || !urlValidatorRegex.test(this.projectURL)) {
      throw getKnowledgeWidgetInvalidProductURLError();
    }
  }

  /**
   * Initializes the widget.
   * @private
   */
  private _initWidget() {
    const ko16p = [];
    ko16p.push(['_setProject', this.projectKey]);
    window['_ko16_p'] = ko16p;
  }

  /**
   * Loads script into page
   * @private
   */
  private _loadScript() {
    const ko = document.createElement('script');
    ko.type = 'text/javascript';
    ko.async = true;
    ko.src = `${this.projectURL}/javascript/ko-index?__pc=${this.projectKey}`;
    document.head.appendChild(ko);
  }

  /**
   * Init page location first time
   */
  private _initPageLocation() {
    const updatePageLocationInterval = setInterval(() => {
      if (!this.pageLocation || this.isPageLocationUpdated) {
        clearInterval(updatePageLocationInterval);
      }
      if (
        !this.isPageLocationUpdated &&
        window['__ko16'] &&
        this.pageLocation
      ) {
        // Updating page location once
        window['__ko16'].updatePageLoc(this.pageLocation);
        this.isPageLocationUpdated = true;
      }
    });
  }

  /**
   * Update page location on change
   * @private
   */
  private _updatePageLocation() {
    if (!window['__ko16'] || !this.pageLocation) {
      return;
    }
    window['__ko16'].updatePageLoc(this.pageLocation);
  }
}
