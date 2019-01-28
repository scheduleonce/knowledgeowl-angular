/** @docs-private */
export function getKnowledgeLinkArticleMissingError(): Error {
  return Error('knowledge-owl-link requires article name as input.');
}

export function getKnowledgeLinkInvalidArticleError(): Error {
  return Error('knowledge-owl-link requires a valid article name as input.');
}
