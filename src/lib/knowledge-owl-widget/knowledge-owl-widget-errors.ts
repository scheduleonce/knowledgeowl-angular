/** @docs-private */
export const getKnowledgeWidgetPoductKeyMissingError = (): Error =>
  Error('knowledge-owl-widget requires product key as input.');

export const getKnowledgeWidgetInvalidProductURLError = (): Error =>
  Error('knowledge-owl-widget requires valid product URL as provider.');
