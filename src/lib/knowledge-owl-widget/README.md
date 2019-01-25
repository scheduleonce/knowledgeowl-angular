# knowledgeowl-angular

Angular project that enables angular application to add KnowledgeOwl widget and to link HTML elements to Knowledgeowl help article.

#### Available features

| Feature      | Notes | Docs      |
| ------------ | ----- | --------- |
| Article link |       | [Docs][0] |

## How to use?

##### Step 1:

You can use npm command line tool to install package.

```sh
npm install --save @knowledge-angular
```

##### Step 2:

Import the Module:

```sh
import {KnowledgeOwlWidgetModule} from '@angular/material';

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

[0]: https://github.com/scheduleonce/knowledgeowl-angular
