import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { useShowElement } from '../hooks/useShowElement.ts';
import EditPostModal from '../modules/post/components/EditPostModal.tsx';
import { mockedPost } from './__mocks__/mocks.ts';
import { EditPostDocument } from '../gql/graphql.tsx';

describe('EditPostModal tests', () => {
  it('should call onSave method', async () => {
    const showElement = renderHook(() => useShowElement(true));
    const saveMock = vi.fn();
    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: EditPostDocument,
              variables: { postId: 1, text: 'test', tags: 'test' }
            },
            result: {
              data: {}
            }
          }
        ]}
      >
        <EditPostModal
          post={mockedPost}
          showElement={showElement.result.current}
          onSave={saveMock}
        />
      </MockedProvider>
    );

    fireEvent.change(screen.getByTestId('caption'), { target: { value: 'test' } });
    fireEvent.change(screen.getByTestId('tags'), { target: { value: 'test' } });
    fireEvent.click(screen.getByTestId('save-button'));

    await waitFor(() => expect(saveMock).toHaveBeenCalled());
  });
});
