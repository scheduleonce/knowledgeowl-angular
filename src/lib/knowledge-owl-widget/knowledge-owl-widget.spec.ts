import { Component, Provider, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { KnowledgeOwlWidgetModule } from './index';
import {
  getKnowledgeWidgetPoductKeyMissingError,
  getKnowledgeWidgetInvalidProductURLError
} from './knowledge-owl-widget-errors';

@Component({
  template: `<knowledge-owl-widget></knowledge-owl-widget>`
})
class KnowledgeOwlWidgetWithoutCredentials {}

@Component({
  template: `<knowledge-owl-widget></knowledge-owl-widget>`
})
class KnowledgeOwlWidgetWithoutProjectKey {}

@Component({
  template: `
    <knowledge-owl-widget [projectKey]="'testkey'"></knowledge-owl-widget>
  `
})
class KnowledgeOwlWidgetWithCredentials {}

describe('KnowledgeOwl widget with missing credentials', () => {
  it('should throw KnowledgeWidgetProductURLMissingError error', async(() => {
    const fixture = createComponent(KnowledgeOwlWidgetWithoutCredentials, [
      { provide: 'KOProjectURL', useValue: 'wrong url' }
    ]);
    expect(() => fixture.detectChanges()).toThrowError(
      getKnowledgeWidgetInvalidProductURLError().message
    );
  }));

  it('should throw KnowledgeWidgetProductKeyMissingError error', async(() => {
    const fixture = createComponent(KnowledgeOwlWidgetWithoutProjectKey, [
      { provide: 'KOProjectURL', useValue: 'https://knowledgeowl.com' }
    ]);
    expect(() => fixture.detectChanges()).toThrowError(
      getKnowledgeWidgetPoductKeyMissingError().message
    );
  }));
});

describe('KnowledgeOwl widget', () => {
  it('should not throw error when given correct inputs', async(() => {
    const fixture = createComponent(KnowledgeOwlWidgetWithCredentials, [
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
    imports: [KnowledgeOwlWidgetModule, ...imports],
    declarations: [component, ...declarations],
    providers
  }).compileComponents();

  return TestBed.createComponent<T>(component);
}
