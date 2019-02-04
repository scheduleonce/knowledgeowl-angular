/** @docs-private */
export function getKnowledgeLinkArticleMissingError(): Error {
  return Error('knowledge-owl-link requires article URL as input.');
}
