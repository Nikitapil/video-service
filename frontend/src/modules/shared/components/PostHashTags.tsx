import { useMemo } from 'react';
import { getHashTags } from '../../../utils/common.ts';
import { Link } from 'react-router-dom';

interface PostHashTagsProps {
  tags: string[];
}

const PostHashTags = ({ tags }: PostHashTagsProps) => {
  const tags = useMemo(() => {
    return getHashTags(tags);
  }, [tags]);

  return <div className="flex flex-wrap gap-1">
    {/*{tags.map((tag) => (*/}
    {/*  <Link to={}>tag</Link>*/}
    {/*))}*/}
  </div>;
};

export default PostHashTag;
