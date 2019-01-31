# knowledgeowl-angular

Angular project that enables angular application to add KnowledgeOwl widget and to link HTML elements to Knowledgeowl help article.

## How to install?

You can use npm command line tool to install package.

```sh
npm install --save @knowledge-angular
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
<a knowledge-owl-link="article title"></a>
```

## Directives

### `KnowledgeOwlWidget`

Selector: `knowledge-owl-widget`

Exported as: `knowledgeOwlWidget`

## Properties

| Name                               | Required | Description                               |
| ---------------------------------- | -------- | ----------------------------------------- |
| @Input() <br/>`projectURL: string` | true     | Product URL to access KnowledgeOwl widget |
| @Input() <br/>`projectKey: string` | true     | Product key to access KnowledgeOwl widget |

## Directives

### `KnowledgeOwlLink`

Selector: `knowledge-owl-link`

Exported as: `knowledgeOwlLink`

## Properties

| Name                               | Required | Description              |
| ---------------------------------- | -------- | ------------------------ |
| @Input() <br/>`articleURL: string` | true     | KnowledgeOwl Article URL |
