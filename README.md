# knowledgeowl-angular

[![Build Status](https://travis-ci.org/scheduleonce/knowledgeowl-angular.svg?branch=master)](https://travis-ci.org/scheduleonce/knowledgeowl-angular)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Project that enables angular application to integrate KnowledgeOwl widget. This gives following features:

1. Integrate KnowledgeOwl angular widget into application.
2. Link HTML element to KnowledgeOwl article.

## How to install?

You can use npm command line tool to install package.

```sh
npm install knowledgeowl-angular
```

## How to use?

Import the Module:

```sh
import {KnowledgeOwlWidgetModule, KnowledgeOwlLinkModule} from 'knowledgeowl-angular';

@NgModule({
  ...
  imports: [KnowledgeOwlWidgetModule, KnowledgeOwlLinkModule],
  providers: [{provide: 'KOProjectURL', useValue: 'https://knowledgeowlurl.com'}]
  ...
})
export class AppModule { }
```

Add widget in app.component.html

```sh
<knowledge-owl-widget
    [projectKey]="'projectKeyProvidedByKnowledgeOwl'"
></knowledge-owl-widget>
```

## How to link article to `<a>` or `button`?

```sh
<a knowledgeOwlLink="test-article"></a>
```

## Directives

### `KnowledgeOwlWidget`

Selector: `knowledge-owl-widget`

Exported as: `knowledgeOwlWidget`

## Properties

| Name                                 | Required | Description                                    |
| ------------------------------------ | -------- | ---------------------------------------------- |
| @Input() <br/>`projectKey: string`   | true     | Product key to access KnowledgeOwl widget      |
| @Input() <br/>`pageLocation: string` | false    | Page location of application. Example "\start" |

### Open the widget programmatically

The widget exposes an API to open/close programmatically.

```sh
class MyComponent {
  @ViewChild(KnowledgeOwlWidget) widget: KnowledgeOwlWidget;

  someMethod() {
    this.widget.open();
  }
}
```

## Directives

### `KnowledgeOwlLink`

Selector: `knowledgeOwlLink`

Exported as: `knowledgeOwlLink`

## Properties

| Name                                     | Required | Description               |
| ---------------------------------------- | -------- | ------------------------- |
| @Input() <br/>`knowledgeOwlLink: string` | true     | KnowledgeOwl Article Name |
