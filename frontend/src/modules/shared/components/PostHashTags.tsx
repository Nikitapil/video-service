import { useMemo } from 'react';
import { getHashTags } from '../../../utils/common.ts';

interface PostHashTagsProps {
  tags: string[];
  onTagClick: (tagValue: string) => void;
}

const PostHashTags = ({ tags, onTagClick }: PostHashTagsProps) => {
  const computedTags = useMemo(() => {
    return getHashTags(tags);
  }, [tags]);

  return (
    <div className="flex flex-wrap gap-1.5">
      {computedTags.map((tag) => (
        <button
          key={tag.value}
          className="text-sm text-gray-500 common-transition hover:text-gray-900"
          onClick={() => onTagClick(tag.value)}
        >
          {tag.text}
        </button>
      ))}
    </div>
  );
};

export default PostHashTags;
