import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {KnowledgeOwlWidget} from './knowledge-owl-widget';

@NgModule({
  imports: [CommonModule],
  exports: [
    KnowledgeOwlWidget,
  ],
  declarations: [
    KnowledgeOwlWidget
  ],
  providers: []
})
export class KnowledgeOwlWidgetModule {}
