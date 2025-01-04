import { PostType, useEditPostMutation } from '../../../gql/graphql.tsx';
import { ShowableElement } from '../../../hooks/useShowElement.ts';
import Modal from '../../../components/ui/Modal.tsx';
import { useState } from 'react';
import AppInput from '../../../components/ui/inputs/AppInput.tsx';
import AppButton from '../../../components/ui/AppButton.tsx';

interface EditPostModalProps {
  post: PostType;
  showElement: ShowableElement;
  onSave: () => void;
}

const EditPostModal = ({ post, showElement, onSave }: EditPostModalProps) => {
  const [text, setText] = useState(post.text);
  const [tags, setTags] = useState(post.tags.join(', '));

  const [editPost, { loading }] = useEditPostMutation({
    variables: {
      postId: post.id,
      text,
      tags
    }
  });

  const onEdit = async () => {
    await editPost();
    showElement.close();
    onSave();
  };

  return (
    <Modal showElement={showElement}>
      <h2 className="mb-4 text-lg font-bold">Edit post</h2>

      <div className="flex flex-col gap-2">
        <AppInput
          id="caption"
          label="Caption:"
          placeholder="Caption..."
          type="text"
          data-testid="caption"
          max={150}
          value={text}
          disabled={loading}
          onChange={(e) => setText(e.target.value)}
        />

        <AppInput
          id="tags"
          label="Tags:"
          placeholder="Put some tags here"
          data-testid="tags"
          value={tags}
          disabled={loading}
          onChange={(e) => setTags(e.target.value)}
        />

        <div className="mb-1 mt-3 flex gap-3 self-end">
          <AppButton
            text="Cancel"
            disabled={loading}
            onClick={showElement.close}
          />

          <AppButton
            text="Save"
            appearance="danger"
            data-testid="save-button"
            disabled={loading}
            onClick={onEdit}
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditPostModal;
