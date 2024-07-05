# knowledgeowl-angular

[![Build status](https://github.com/scheduleonce/knowledgeowl-angular/actions/workflows/node.js.yml/badge.svg)](https://github.com/scheduleonce/relative-luminance/actions) [![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

> KnowledgeOwl knowledgebase for Angular

Project that enables Angular applications to integrate [KnowledgeOwl](https://www.knowledgeowl.com) widget. This gives following features:

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

```tsx
<knowledge-owl-widget
    [projectKey]="'projectKeyProvidedByKnowledgeOwl'"
></knowledge-owl-widget>
```

## How to link article to `<a>` or `button`?

```tsx
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

```ts
class MyComponent {
  @ViewChild(KnowledgeOwlWidget) widget: KnowledgeOwlWidget;

  someMethod() {
    this.widget.open();
  }
}
```

### Open the article in widget programmatically

The widget exposes an API to open/close widget with article programmatically.

```ts
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

## Development

### How to publish a new version

Create a new version

```sh
npm version [<new_version> | major | minor | patch]
```

New version is automatically published to npm when [creating a new release](.github/workflows/npm-publish.yml) on Github. Check out the release section in the repo. Read more about releases [here](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository).
