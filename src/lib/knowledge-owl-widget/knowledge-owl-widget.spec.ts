import { Component, Provider, Type } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { KnowledgeOwlWidgetModule } from './index';
import {
  getKnowledgeWidgetPoductKeyMissingError,
  getKnowledgeWidgetInvalidProductURLError,
} from './knowledge-owl-widget-errors';

@Component({
  template: `<knowledge-owl-widget></knowledge-owl-widget>`,
})
class KnowledgeOwlWidgetWithoutCredentials {}

@Component({
  template: `<knowledge-owl-widget></knowledge-owl-widget>`,
})
class KnowledgeOwlWidgetWithoutProjectKey {}

@Component({
  template: `
    <knowledge-owl-widget [projectKey]="'testkey'"></knowledge-owl-widget>
  `,
})
class KnowledgeOwlWidgetWithCredentials {}

describe('KnowledgeOwl widget with missing credentials', () => {
  it(
    'should throw KnowledgeWidgetProductURLMissingError error',
    waitForAsync(() => {
      const fixture = createComponent(KnowledgeOwlWidgetWithoutCredentials, [
        { provide: 'KOProjectURL', useValue: 'wrong url' },
      ]);
      expect(() => fixture.detectChanges()).toThrowError(
        getKnowledgeWidgetInvalidProductURLError().message
      );
    })
  );

  it(
    'should throw KnowledgeWidgetProductKeyMissingError error',
    waitForAsync(() => {
      const fixture = createComponent(KnowledgeOwlWidgetWithoutProjectKey, [
        { provide: 'KOProjectURL', useValue: 'https://knowledgeowl.com' },
      ]);
      expect(() => fixture.detectChanges()).toThrowError(
        getKnowledgeWidgetPoductKeyMissingError().message
      );
    })
  );
});

describe('KnowledgeOwl widget', () => {
  it(
    'should not throw error when given correct inputs',
    waitForAsync(() => {
      const fixture = createComponent(KnowledgeOwlWidgetWithCredentials, [
        { provide: 'KOProjectURL', useValue: 'https://knowledgeowl.com' },
      ]);
      expect(() => fixture.detectChanges()).not.toThrowError();
    })
  );
});

const createComponent = <T>(
  component: Type<T>,
  providers: Provider[] = []
): ComponentFixture<T> => {
  TestBed.configureTestingModule({
    imports: [KnowledgeOwlWidgetModule],
    declarations: [component],
    providers,
  }).compileComponents();

  return TestBed.createComponent<T>(component);
};
