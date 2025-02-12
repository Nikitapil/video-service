import { describe, it, expect, vi, beforeAll } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Upload from '../modules/upload/pages/Upload.tsx';
import { CreatePostDocument } from '../gql/graphql.tsx';

describe('Upload page tests', () => {
  beforeAll(() => {
    global.URL.createObjectURL = vi.fn(() => 'mock-blob-url');
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom');
      return {
        ...actual,
        useNavigate: vi.fn(),
        useSearchParams: vi.fn(() => [new URLSearchParams('')]) // defaults to empty
      };
    });
  });

  it('Should render default page state', async () => {
    render(
      <MockedProvider mocks={[]}>
        <MemoryRouter>
          <Upload />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.getByTestId('video-uploader')).toBeInTheDocument();
    expect(screen.queryByTestId('upload-form')).not.toBeInTheDocument();
  });

  it('Should not handle file change if no files', async () => {
    render(
      <MockedProvider mocks={[]}>
        <MemoryRouter>
          <Upload />
        </MemoryRouter>
      </MockedProvider>
    );

    fireEvent.change(screen.getByTestId('upload-input'), { target: { value: '' } });

    await waitFor(() => expect(screen.queryByTestId('upload-form')).not.toBeInTheDocument());
  });

  it('Should not handle file upload for file size > 2Gb', async () => {
    render(
      <MockedProvider mocks={[]}>
        <MemoryRouter>
          <Upload />
        </MemoryRouter>
      </MockedProvider>
    );

    const file = new File([new ArrayBuffer(1024 * 1024 * 1024 * 3)], 'test.mp4');

    fireEvent.change(screen.getByTestId('upload-input'), { target: { value: '', files: [file] } });

    await waitFor(() => expect(screen.queryByTestId('upload-form')).not.toBeInTheDocument());
  });

  it('Should handle file upload', async () => {
    render(
      <MockedProvider mocks={[]}>
        <MemoryRouter>
          <Upload />
        </MemoryRouter>
      </MockedProvider>
    );

    const fileInput = screen.getByTestId('upload-input') as HTMLInputElement;
    const file = new File(['video content'], 'test-video.mp4', { type: 'video/mp4' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(fileInput.files?.[0]).toStrictEqual(file);
    await waitFor(() => expect(screen.getByTestId('upload-form')).toBeInTheDocument());
  });

  it('Should handle file drop', async () => {
    render(
      <MockedProvider mocks={[]}>
        <MemoryRouter>
          <Upload />
        </MemoryRouter>
      </MockedProvider>
    );

    const file = new File(['video content'], 'test-video.mp4', { type: 'video/mp4' });

    fireEvent.drop(screen.getByTestId('video-uploader'), { dataTransfer: { files: [file] } });

    await waitFor(() => expect(screen.getByTestId('upload-form')).toBeInTheDocument());
  });

  it('Should not handle file drop for wrong type', async () => {
    render(
      <MockedProvider mocks={[]}>
        <MemoryRouter>
          <Upload />
        </MemoryRouter>
      </MockedProvider>
    );

    const file = new File(['video content'], 'test-video.txt', { type: 'text/plain' });

    fireEvent.drop(screen.getByTestId('video-uploader'), { dataTransfer: { files: [file] } });

    await waitFor(() => expect(screen.queryByTestId('upload-form')).not.toBeInTheDocument());
  });

  it('Should handle clear uploaded file', async () => {
    render(
      <MockedProvider mocks={[]}>
        <MemoryRouter>
          <Upload />
        </MemoryRouter>
      </MockedProvider>
    );

    const file = new File(['video content'], 'test-video.mp4', { type: 'video/mp4' });

    fireEvent.drop(screen.getByTestId('video-uploader'), { dataTransfer: { files: [file] } });

    fireEvent.click(screen.getByTestId('clear-video-button'));

    await waitFor(() => expect(screen.queryByTestId('upload-form')).not.toBeInTheDocument());
  });

  it('Should handle discard uploaded file', async () => {
    render(
      <MockedProvider mocks={[]}>
        <MemoryRouter>
          <Upload />
        </MemoryRouter>
      </MockedProvider>
    );

    const file = new File(['video content'], 'test-video.mp4', { type: 'video/mp4' });

    fireEvent.drop(screen.getByTestId('video-uploader'), { dataTransfer: { files: [file] } });

    fireEvent.click(screen.getByTestId('discard-button'));

    await waitFor(() => expect(screen.queryByTestId('upload-form')).not.toBeInTheDocument());
  });

  it('Should handle createPost', async () => {
    const file = new File(['video content'], 'test-video.mp4', { type: 'video/mp4' });
    let isMockCalled = false;
    const requestMock = {
      request: {
        query: CreatePostDocument,
        variables: { text: '123', tags: '', video: file }
      },
      result: () => {
        isMockCalled = true;
        return {
          data: {}
        };
      }
    };
    render(
      <MockedProvider mocks={[requestMock]}>
        <MemoryRouter>
          <Upload />
        </MemoryRouter>
      </MockedProvider>
    );

    fireEvent.drop(screen.getByTestId('video-uploader'), { dataTransfer: { files: [file] } });

    fireEvent.change(screen.getByTestId('caption-input'), { target: { value: '123' } });

    fireEvent.click(screen.getByTestId('create-button'));

    await waitFor(() => expect(isMockCalled).toBe(true));
  });

  it('Should handle createPost with tags and navigate', async () => {
    const file = new File(['video content'], 'test-video.mp4', { type: 'video/mp4' });

    const mockNavigate = vi.fn();
    (useNavigate as any).mockReturnValue(mockNavigate);

    const requestMock = {
      request: {
        query: CreatePostDocument,
        variables: { text: '123', tags: 'testTag', video: file }
      },
      result: () => {
        return {
          data: {
            createPost: {
              id: 1
            }
          }
        };
      }
    };
    render(
      <MockedProvider mocks={[requestMock]}>
        <MemoryRouter>
          <Upload />
        </MemoryRouter>
      </MockedProvider>
    );

    fireEvent.drop(screen.getByTestId('video-uploader'), { dataTransfer: { files: [file] } });

    fireEvent.change(screen.getByTestId('caption-input'), { target: { value: '123' } });
    fireEvent.change(screen.getByTestId('tags-input'), { target: { value: 'testTag' } });

    fireEvent.click(screen.getByTestId('create-button'));

    await waitFor(() => expect(useNavigate).toHaveBeenCalled());
  });

  it('should call preventDefault on dragOver', async () => {
    render(
      <MockedProvider mocks={[]}>
        <MemoryRouter>
          <Upload />
        </MemoryRouter>
      </MockedProvider>
    );
    const dropZone = screen.getByTestId('video-uploader');

    const dragOverEvent = new Event('dragover', { bubbles: true, cancelable: true });
    dragOverEvent.preventDefault = vi.fn();

    dropZone.dispatchEvent(dragOverEvent);

    await waitFor(() => expect(dragOverEvent.preventDefault).toHaveBeenCalled());
  });

  it('should call preventDefault on dragEnter', async () => {
    render(
      <MockedProvider mocks={[]}>
        <MemoryRouter>
          <Upload />
        </MemoryRouter>
      </MockedProvider>
    );
    const dropZone = screen.getByTestId('video-uploader');

    const dragEnterEvent = new Event('dragenter', { bubbles: true, cancelable: true });
    dragEnterEvent.preventDefault = vi.fn();

    dropZone.dispatchEvent(dragEnterEvent);

    await waitFor(() => expect(dragEnterEvent.preventDefault).toHaveBeenCalled());
  });

  it('Should not handle file change without file', async () => {
    render(
      <MockedProvider mocks={[]}>
        <MemoryRouter>
          <Upload />
        </MemoryRouter>
      </MockedProvider>
    );

    fireEvent.change(screen.getByTestId('upload-input'), { target: { files: null } });

    await waitFor(() => expect(screen.queryByTestId('upload-form')).not.toBeInTheDocument());
  });
});
