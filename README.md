# knowledgeowl-angular

[![Build status](https://github.com/scheduleonce/knowledgeowl-angular/actions/workflows/ci.yml/badge.svg)](https://github.com/scheduleonce/knowledgeowl-angular/actions)

Project that enables angular application to integrate KnowledgeOwl widget. This gives following features:

1. Integrate KnowledgeOwl angular widget into application.
2. Link HTML element to KnowledgeOwl article.

## How to install?

You can use npm command line tool to install package.

```sh
npm install @oncehub/knowledgeowl-angular
```

## How to use?

Import the Module:

```sh
import {KnowledgeOwlWidgetModule, KnowledgeOwlLinkModule} from '@oncehub/knowledgeowl-angular';

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

### Open the article in widget programmatically

The widget exposes an API to open/close widget with article programmatically.

```sh
class MyComponent {
  @ViewChild(KnowledgeOwlWidget) widget: KnowledgeOwlWidget;

  someMethod() {
    this.widget.open('article-name');
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

### Development

Package is automatically pushed to npm when [creating a new release](.github/workflows/npm-publish.yml) on Github. Check out the release section in the repo. Read more about releases [here](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository).

### License

This module is licensed under the MIT License. See the LICENSE file for details.
