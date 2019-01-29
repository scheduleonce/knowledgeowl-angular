/** @docs-private */
export function getKnowledgeWidgetPoductKeyMissingError(): Error {
  return Error('knowledge-owl-widget requires product key as input.');
}

export function getKnowledgeWidgetPoductURLMissingError(): Error {
  return Error('knowledge-owl-widget requires product URL as input.');
}
