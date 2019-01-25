import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KnowledgeOwlLink } from './knowledge-owl-link';

@NgModule({
  imports: [CommonModule],
  exports: [KnowledgeOwlLink],
  declarations: [KnowledgeOwlLink]
})
export class KnowledgeOwlLinkModule {}
