# knowledgeowl-angular

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
import {KnowledgeOwlWidgetModule} from '@knowledgeOwl-angular';

@NgModule({
  ...
  imports: [KnowledgeOwlWidgetModule],
  ...
})
export class AppModule { }
```

Add widget in app.component.html

```sh
<knowledge-owl-widget></knowledge-owl-widget>
```

## How to link article to `<a>` or `button`?

```sh
<a knowledgeOwlLink="https://knowledgeowl.article.com/help/test-article"></a>
```

## Directives

### `KnowledgeOwlWidget`

Selector: `knowledge-owl-widget`

Exported as: `knowledgeOwlWidget`

## Properties

| Name                                 | Required | Description                                    |
| ------------------------------------ | -------- | ---------------------------------------------- |
| @Input() <br/>`projectURL: string`   | true     | Product URL to access KnowledgeOwl widget      |
| @Input() <br/>`projectKey: string`   | true     | Product key to access KnowledgeOwl widget      |
| @Input() <br/>`pageLocation: string` | false    | Page location of application. Example "\start" |

## Directives

### `KnowledgeOwlLink`

Selector: `knowledgeOwlLink`

Exported as: `knowledgeOwlLink`

## Properties

| Name                                     | Required | Description              |
| ---------------------------------------- | -------- | ------------------------ |
| @Input() <br/>`knowledgeOwlLink: string` | true     | KnowledgeOwl Article URL |
