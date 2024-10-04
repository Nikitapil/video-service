export const getHashTags = (hashTags: string[]) =>
  hashTags.map((tag) => ({
    text: `#${tag}`,
    value: tag
  }));
