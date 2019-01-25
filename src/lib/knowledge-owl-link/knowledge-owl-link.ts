import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';

/**
 * Knowledge Owl Link
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: `a[knowledge-owl-link]`,
  exportAs: 'knowledgeOwlLink',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    // TODO: Define host if needed
  },
  // tslint:disable-next-line:use-input-property-decorator
  inputs: ['disabled', 'color'],
  template: '',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KnowledgeOwlLink {
  constructor(elementRef: ElementRef) {

  }
}
