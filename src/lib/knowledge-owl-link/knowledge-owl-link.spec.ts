import { Component, Provider, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { KnowledgeOwlLinkModule } from './index';
import { getKnowledgeLinkArticleMissingError } from './knowledge-owl-widget-errors';

@Component({
  template: `
    <a knowledgeOwlLink>Test link</a>
  `
})
class KnowledgeOwlLinkWithoutArticle {}

@Component({
  template: `
    <a knowledgeOwlLink="https://knowledgeowl.article.com/help/test-article"
      >Test link</a
    >
  `
})
class KnowledgeOwlLinkWithValidInputs {}

describe('KnowledgeOwl link with missing credentials', () => {
  it('should throw error without knowledgeOwlLink', async(() => {
    const fixture = createComponent(KnowledgeOwlLinkWithoutArticle, [
      { provide: 'KOProjectURL', useValue: 'https://knowledgeowl.com' }
    ]);
    expect(() => fixture.detectChanges()).toThrowError(
      getKnowledgeLinkArticleMissingError().message
    );
  }));
});

describe('KnowledgeOwl link', () => {
  it('should not throw error when given correct inputs', async(() => {
    const fixture = createComponent(KnowledgeOwlLinkWithValidInputs, [
      { provide: 'KOProjectURL', useValue: 'https://knowledgeowl.com' }
    ]);
    expect(() => fixture.detectChanges()).not.toThrowError();
  }));
});

function createComponent<T>(
  component: Type<T>,
  providers: Provider[] = [],
  imports: any[] = [],
  declarations: any[] = []
): ComponentFixture<T> {
  TestBed.configureTestingModule({
    imports: [KnowledgeOwlLinkModule, ...imports],
    declarations: [component, ...declarations],
    providers
  }).compileComponents();

  return TestBed.createComponent<T>(component);
}
