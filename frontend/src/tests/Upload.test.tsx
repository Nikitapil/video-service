import { describe, it, expect, vi, beforeAll } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import Upload from '../modules/upload/pages/Upload.tsx';

describe('Upload page tests', () => {
  beforeAll(() => {
    global.URL.createObjectURL = vi.fn(() => 'mock-blob-url');
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
});
