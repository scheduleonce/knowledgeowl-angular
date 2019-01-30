/** @docs-private */
export function getKnowledgeLinkArticleMissingError(): Error {
  return Error('knowledge-owl-link requires article URL as input.');
}

export function getKnowledgeLinkInvalidArticleError(): Error {
  return Error('knowledge-owl-link requires a valid article URL as input.');
}
