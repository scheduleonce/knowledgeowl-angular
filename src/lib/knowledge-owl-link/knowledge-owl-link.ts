import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewEncapsulation
} from '@angular/core';
import {
  getKnowledgeLinkArticleMissingError,
  getKnowledgeLinkInvalidArticleError
} from './knowledge-owl-widget-errors';

/** Regex to validate article URL is valid or not */
const urlValidatorRegex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

/**
 * Knowledge Owl Link
 */
@Component({
  selector: `a[knowledgeOwlLink]`,
  exportAs: 'knowledgeOwlLink',
  templateUrl: 'knowledge-owl-link.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KnowledgeOwlLink implements AfterContentInit {
  @Input()
  knowledgeOwlLink: string;

  constructor(protected elementRef: ElementRef) {}

  getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  ngAfterContentInit() {
    this._validateLinkInputs();
    this._initLink();
  }

  @HostListener('click', ['$event'])
  openArticle(event: Event) {
    event.preventDefault();
    // Convert the KO link into the widget link
    const widgetHref =
      this.knowledgeOwlLink.replace('/help/', '/help/fetch-article/hash/') +
      '?widget=true';
    if (window['__ko16']) {
      // Wait until widget loads completely
      window['__ko16'].openArticle(widgetHref);
    }
  }

  /**
   * Private methods
   */

  /**
   * Initialize link
   * @private
   */
  private _initLink() {
    const nativeElement = this.getHostElement();
    if (nativeElement.tagName === 'A') {
      // Updating link for <a>
      nativeElement.setAttribute('href', this.knowledgeOwlLink);
    }
  }

  /**
   * Validates all required inputs of knowledge-owl-link
   * @private
   */
  private _validateLinkInputs() {
    this._validateArticlePresence();
    this._validateArticleURLFormat();
  }

  /**
   * Validates presence of article URL for link
   * @private
   */
  private _validateArticlePresence() {
    if (!this.knowledgeOwlLink) {
      throw getKnowledgeLinkArticleMissingError();
    }
  }

  /**
   * Validates format of article URL for link
   * @private
   */
  private _validateArticleURLFormat() {
    if (
      !this.knowledgeOwlLink.trim() ||
      !urlValidatorRegex.test(this.knowledgeOwlLink)
    ) {
      throw getKnowledgeLinkInvalidArticleError();
    }
  }
}
