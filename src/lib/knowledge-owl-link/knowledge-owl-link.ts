import {
  AfterContentInit,
  ElementRef,
  HostListener,
  Inject,
  Input,
  Directive,
} from '@angular/core';
import { getKnowledgeLinkArticleMissingError } from './knowledge-owl-widget-errors';

/**
 * Knowledge Owl Link
 */
@Directive({
  selector: `a[knowledgeOwlLink]`,
  exportAs: 'knowledgeOwlLink',
})
export class KnowledgeOwlLink implements AfterContentInit {
  @Input()
  knowledgeOwlLink: string;

  constructor(
    protected elementRef: ElementRef,
    @Inject('KOProjectURL') private projectURL: string
  ) {}

  getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  ngAfterContentInit(): void {
    this._validateLinkInputs();
    this._initLink();
  }

  @HostListener('click', ['$event'])
  openArticle(event: Event): void {
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
   *
   * @private
   */
  private _initLink() {
    this.knowledgeOwlLink = `${this.projectURL}/help/${this.knowledgeOwlLink}`; // Updating article link to have complete URL
    const nativeElement = this.getHostElement();
    if (nativeElement.tagName === 'A') {
      // Updating link for <a>
      nativeElement.setAttribute('href', this.knowledgeOwlLink);
    }
  }

  /**
   * Validates all required inputs of knowledge-owl-link
   *
   * @private
   */
  private _validateLinkInputs() {
    this._validateArticlePresence();
  }

  /**
   * Validates presence of article URL for link
   *
   * @private
   */
  private _validateArticlePresence() {
    if (!this.knowledgeOwlLink) {
      throw getKnowledgeLinkArticleMissingError();
    }
  }
}
