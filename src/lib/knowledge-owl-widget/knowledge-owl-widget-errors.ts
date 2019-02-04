/** @docs-private */
export function getKnowledgeWidgetPoductKeyMissingError(): Error {
  return Error('knowledge-owl-widget requires product key as input.');
}

export function getKnowledgeWidgetInvalidProductURLError(): Error {
  return Error('knowledge-owl-widget requires valid product URL as provider.');
}
