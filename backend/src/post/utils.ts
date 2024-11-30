export const prepareHashTagsArray = (tags: string) => {
  return (
    tags
      .split(' ')
      .map((tag) => tag.replace(/[^a-zA-Z0-9]/g, ''))
      .filter((tag, index, arr) => !!tag && index === arr.indexOf(tag)) || []
  );
};
