import { Component, Provider, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KnowledgeOwlLinkModule } from './index';
import { getKnowledgeLinkArticleMissingError } from './knowledge-owl-widget-errors';
import { KO_PROJECT_URL } from 'ko-project-url.token';

@Component({
  template: `<a knowledgeOwlLink>Test link</a>`,
  standalone: false,
})
class KnowledgeOwlLinkWithoutArticle {}


@Component({
  template: `
    <a knowledgeOwlLink="https://knowledgeowl.article.com/help/test-article"
      >Test link</a
    >
  `,
  standalone: false,
})
class KnowledgeOwlLinkWithValidInputs {}

describe('KnowledgeOwl link with missing credentials', () => {
  it('should throw error without knowledgeOwlLink', () => {
    const fixture = createComponent(KnowledgeOwlLinkWithoutArticle, [
      { provide: KO_PROJECT_URL, useValue: 'https://knowledgeowl.com' },
    ]);
    expect(() => fixture.detectChanges()).toThrowError(
      getKnowledgeLinkArticleMissingError().message
    );
  });
});

describe('KnowledgeOwl link', () => {
  it('should not throw error when given correct inputs', () => {
    const fixture = createComponent(KnowledgeOwlLinkWithValidInputs, [
      { provide: KO_PROJECT_URL, useValue: 'https://knowledgeowl.com' },
    ]);
    expect(() => fixture.detectChanges()).not.toThrowError();
  });
});

const createComponent = <T>(
  component: Type<T>,
  providers: Provider[] = []
): ComponentFixture<T> => {
  TestBed.configureTestingModule({
    imports: [KnowledgeOwlLinkModule],
    declarations: [component],
    providers,
  }).compileComponents();

  return TestBed.createComponent<T>(component);
};
