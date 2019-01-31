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
  /** Flag to check initial page location updated */
  isPageLocationUpdated = false;

  /** Product URL to access KnowledgeOwl widget. */
  @Input()
  projectURL: string;

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

  constructor() {}

  ngOnInit() {
    this._initWidget();
    this._loadScript();
  }

  ngAfterContentInit() {
    this._validateWidgetInputs();
    this._initPageLocation();
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
  private _initWidget() {
    const _ko16_p = [];
    _ko16_p.push(['_setProject', this.projectKey]);
    window['_ko16_p'] = _ko16_p;
  }

  /**
   * Loads script into page
   * @private
   */
  private _loadScript() {
    const ko = document.createElement('script');
    ko.type = 'text/javascript';
    ko.async = true;
    ko.src = `${this.projectURL}?__pc=${this.projectKey}`;
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
