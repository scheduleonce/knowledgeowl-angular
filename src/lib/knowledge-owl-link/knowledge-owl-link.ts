import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewEncapsulation
} from '@angular/core';
import {
  getKnowledgeLinkArticleMissingError,
  getKnowledgeLinkInvalidArticleError
} from './knowledge-owl-widget-errors';

const KnowledgeOwlURL = 'https://help.onceplatform.com/help/';

/**
 * Knowledge Owl Link
 */
@Component({
  selector: `a[knowledge-owl-link]`,
  exportAs: 'knowledgeOwlLink',
  host: {
    '(click)': '_openHelpArticle($event)'
  },
  templateUrl: 'knowledge-owl-link.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KnowledgeOwlLink implements AfterContentInit {
  @Input()
  article: string;

  constructor(protected elementRef: ElementRef) {}

  getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  ngAfterContentInit() {
    this._validateLinkInputs();
    this._constructArticleURL(); // updates href for a
  }

  _openHelpArticle(event: Event) {
    event.preventDefault();
    const nativeElement = this.getHostElement();
    const artHref = nativeElement.getAttribute('href');
    // Convert the KO link into the widget link
    const widgetHref =
      artHref.replace('/help/', '/help/fetch-article/hash/') + '?widget=true';
    // Set the article iframe to the selected article url
    document
      .querySelector('._ko16_widget_art_ext_cntr a')
      .setAttribute('href', widgetHref);
    // Store the article url in local storage to allow them to re-open to that article on page reload
    sessionStorage.setItem('_ko16_activeArt', widgetHref);
    sessionStorage.setItem('_ko16_activeFetchArt', widgetHref);
    const backButtonElement = document.querySelector(
      '._ko16_widget_back'
    ) as HTMLElement;
    const centerElement = document.querySelector(
      '._ko16_section_cntr'
    ) as HTMLElement;
    // Show / hide UX elements and resize widget accordingly
    backButtonElement.style.display = 'block';
    centerElement.style.display = 'none';
    const Ko16WidgetArtExtCntr = document.querySelector(
      '._ko16_widget_art_ext_cntr'
    ) as HTMLElement;
    Ko16WidgetArtExtCntr.style.display = 'block';
    const Ko16WidgetBtmCntr = document.querySelector(
      '._ko16_widget_btm_cntr'
    ) as HTMLElement;
    Ko16WidgetBtmCntr.style.display = 'none';

    // const Ko16 = _jquery('#_ko16-widget-wrapper');
    const Ko16 = document.querySelector('#_ko16-widget-wrapper') as HTMLElement;
    const Ko16WidgetArtContent = document.getElementById(
      '_ko16_widget_art_content'
    );
    const Ko16WidgetContactForm = document.getElementById(
      '_ko16_widget_contact_form'
    );

    if (window.innerWidth >= 480) {
      Ko16.style.width = '480px';
      Ko16WidgetArtContent.setAttribute('width', '460');
      Ko16WidgetContactForm.setAttribute('width', '460');
    } else {
      Ko16.style.width = window.innerWidth + 'px';
      Ko16WidgetArtContent.setAttribute(
        'width',
        (window.innerWidth - 20).toString()
      );
      Ko16WidgetContactForm.setAttribute(
        'width',
        (window.innerWidth - 20).toString()
      );
    }

    // Set the max sections heights
    let usedHeight = this.getAbsoluteHeight(
      document.querySelector('._ko16_widget_top_cntr')
    );

    const Ko16WidgetSearchCntr = document.querySelector(
      '._ko16_widget_search_cntr'
    ) as HTMLElement;

    if (Ko16WidgetSearchCntr.style.display != null) {
      usedHeight = usedHeight + this.getAbsoluteHeight(Ko16WidgetSearchCntr);
    }
    if (Ko16WidgetBtmCntr.style.display != null) {
      this.showElement(Ko16WidgetBtmCntr); // Showing element to get height
      usedHeight = usedHeight + this.getAbsoluteHeight(Ko16WidgetBtmCntr);
      this.hideElement(Ko16WidgetBtmCntr);
    } else if (Ko16WidgetArtExtCntr.style.display != null) {
      usedHeight = usedHeight + this.getAbsoluteHeight(Ko16WidgetArtExtCntr);
    }
    const sectionHeight = window.innerHeight - usedHeight;
    Ko16WidgetContactForm.setAttribute(
      'height',
      (sectionHeight - 10).toString()
    );
    Ko16WidgetArtContent.setAttribute(
      'height',
      (sectionHeight - 10).toString()
    );
    const widgetScrollableContainer = document.querySelector(
      '._ko16_widget_scrollable_cntr'
    ) as HTMLElement;
    widgetScrollableContainer.style.height = sectionHeight + 'px';

    // Provide loading feedback
    this.showElement(document.querySelector('._ko16_widget_loading_cntr'));

    Ko16WidgetArtContent.setAttribute('src', widgetHref);
    Ko16WidgetArtContent.onload = function() {
      debugger;
      console.log('load complete');
      (document.querySelector(
        '._ko16_widget_loading_cntr'
      ) as HTMLElement).style.display = 'none';
      (document.querySelector(
        '._ko16_widget_art_cntr'
      ) as HTMLElement).style.display = 'block';
    };
    if (!Ko16.classList.contains('_ko16-widget-open')) {
      const Ko16SearchBox = document.getElementById('_ko16_search_box');
      if (Ko16.classList.contains('_ko16-widget-closed')) {
        Ko16.classList.remove('_ko16-widget-closed');
        Ko16.classList.add('_ko16-widget-open');
        Ko16SearchBox.focus();
      } else {
        Ko16.classList.add('_ko16-widget-open');
        Ko16SearchBox.focus();
      }
    }
  }

  /**
   * Private methods
   */

  /**
   *
   * @private
   */
  private _constructArticleURL() {
    const nativeElement = this.getHostElement();
    this.article = `${KnowledgeOwlURL}${this.article}`;
    if (nativeElement.tagName === 'A') {
      // Updating link for <a>
      nativeElement.setAttribute('href', this.article);
    }
  }

  /**
   *
   * @private
   */
  private _validateLinkInputs() {
    this._validateArticle();
    this._validateArticleName();
  }

  /**
   *
   * @private
   */
  private _validateArticle() {
    if (!this.article) {
      throw getKnowledgeLinkArticleMissingError();
    }
  }

  /**
   *
   * @private
   */
  private _validateArticleName() {
    if (!this.article.trim()) {
      throw getKnowledgeLinkInvalidArticleError();
    }
  }

  private getAbsoluteHeight(el: HTMLElement) {
    // Get the DOM Node if you pass in a string
    // el = (typeof el === 'string') ? document.querySelector(el) : el;

    const styles = window.getComputedStyle(el);
    const margin =
      parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);

    return Math.ceil(el.offsetHeight + margin);
  }

  private showElement(el: HTMLElement) {
    el.style.display = 'block';
  }

  private hideElement(el: HTMLElement) {
    el.style.display = 'none';
  }
}
